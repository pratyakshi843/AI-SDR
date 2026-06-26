from pydantic import BaseModel, EmailStr
from typing import Optional


class LeadCreate(BaseModel):
    company: str
    contact_name: str
    email: EmailStr

class LeadUpdate(BaseModel):
    company: Optional[str] = None
    contact_name: Optional[str] = None
    email: Optional[EmailStr] = None
    status: Optional[str] = None

class LeadResponse(BaseModel):
    id: str
    company: str
    contact_name: str
    email: EmailStr
    status: str
    qualification: Optional[str]
    generated_email: Optional[str]
    lead_score: Optional[str]
    reason: Optional[str]

    class Config:
        from_attributes = True