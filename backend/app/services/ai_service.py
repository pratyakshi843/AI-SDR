import json

import google.generativeai as genai
from fastapi import HTTPException
from sqlalchemy.orm import Session
import traceback
from app.config import settings
from app.models.lead import Lead
from app.utils.prompt_templates import (
    LEAD_QUALIFICATION_PROMPT,
    EMAIL_GENERATION_PROMPT,
)
def ask_gemini(prompt: str):

    try:

        response = model.generate_content(prompt)

        return response.text.strip()

    except Exception as e:
    

     traceback.print_exc()

     raise HTTPException(
        status_code=500,
        detail=str(e)   
     )

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Create Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


def qualify_lead(lead_id: str, db: Session):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    prompt = LEAD_QUALIFICATION_PROMPT.format(
        company=lead.company,
        contact=lead.contact_name,
        email=lead.email
    )

    try:

        content = ask_gemini(prompt)

        print("Raw Gemini Response:")
        print(content)

        if content.startswith("```json"):
         content = content.replace("```json", "").replace("```", "").strip()

        elif content.startswith("```"):
         content = content.replace("```", "").strip()

         print("Gemini Raw Response:")
        print(content)

        result = json.loads(content)

        print("Parsed Result:")
        print(result)

        print("Parsed JSON:")
        print(result)

    except Exception as e:
    

        traceback.print_exc()

        raise HTTPException(
        status_code=500,
        detail=str(e)
        )

    # -------------------------------
    # Score Logic
    # -------------------------------
    print("Lead Score:", result.get("lead_score"))
    print("Reason:", result.get("reason"))
    try:
        score = int(result.get("lead_score", 0))
    except (ValueError, TypeError):
        raise HTTPException(
        status_code=500,
        detail="Gemini returned an invalid lead_score."
    )

    if score >= 90:
        qualification = "Hot Lead"

    elif score >= 75:
        qualification = "Qualified"

    elif score >= 60:
        qualification = "Warm Lead"

    elif score >= 40:
        qualification = "Cold Lead"

    else:
        qualification = "Unqualified"

    lead.lead_score = str(score)
    lead.qualification = qualification
    lead.status = qualification
    lead.reason = result.get("reason", "")

    db.commit()
    db.refresh(lead)

    return {
        "lead_score": score,
        "qualification": qualification,
        "reason": result.get("reason", "")
    }

def generate_email(lead_id: str, db: Session):
    """
    Generate a personalized cold email using Gemini.
    """

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    prompt = EMAIL_GENERATION_PROMPT.format(
        company=lead.company,
        contact=lead.contact_name,
        email=lead.email,
        qualification=lead.qualification
    )

    try:
        email = ask_gemini(prompt)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini Error: {str(e)}"
        )

    lead.generated_email = email

    lead.status = "Email Generated" 
    db.commit()
    db.refresh(lead)

    return {
        "generated_email": email
    }