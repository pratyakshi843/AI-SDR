from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.ai_service import (
    qualify_lead,
    generate_email
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/qualify/{lead_id}")
def qualify(
    lead_id: str,
    db: Session = Depends(get_db)
):
    return qualify_lead(
        lead_id,
        db
    )


@router.post("/generate-email/{lead_id}")
def email(
    lead_id: str,
    db: Session = Depends(get_db)
):
    return generate_email(
        lead_id,
        db
    )