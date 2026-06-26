from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.schemas.lead_schema import LeadCreate
from app.schemas.lead_schema import LeadUpdate

from app.services.lead_service import (
    create_lead,
    get_all_leads,
    get_single_lead,
    update_lead,
    delete_lead
)

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


@router.post("/")
def create(
    data: LeadCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return create_lead(
        data,
        db,
        current_user
    )


@router.get("/")
def get_all(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_all_leads(
        db,
        current_user
    )


@router.get("/{id}")
def get_one(
    id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_single_lead(
        id,
        db,
        current_user
    )


@router.put("/{id}")
def update(
    id: str,
    data: LeadUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return update_lead(
        id,
        data,
        db,
        current_user
    )


@router.delete("/{id}")
def delete(
    id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return delete_lead(
        id,
        db,
        current_user
    )