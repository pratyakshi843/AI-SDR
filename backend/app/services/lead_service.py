from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.lead import Lead


def create_lead(data, db: Session, current_user):

    lead = Lead(
        company=data.company,
        contact_name=data.contact_name,
        email=data.email,
        owner_id=current_user.id
    )

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def get_all_leads(db: Session, current_user):

    return db.query(Lead).filter(
        Lead.owner_id == current_user.id
    ).all()


def get_single_lead(id: str, db: Session, current_user):

    lead = db.query(Lead).filter(
        Lead.id == id,
        Lead.owner_id == current_user.id
    ).first()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return lead


def update_lead(id, data, db, current_user):

    lead = get_single_lead(
        id,
        db,
        current_user
    )

    if data.company is not None:
        lead.company = data.company

    if data.contact_name is not None:
        lead.contact_name = data.contact_name

    if data.email is not None:
        lead.email = data.email

    if data.status is not None:
        lead.status = data.status   

    db.commit()
    db.refresh(lead)

    return lead


def delete_lead(id, db, current_user):

    lead = get_single_lead(
        id,
        db,
        current_user
    )

    db.delete(lead)
    db.commit()

    return {
        "message": "Lead deleted successfully"
    }