from pydantic import BaseModel


class LeadQualificationResponse(BaseModel):
    lead_score: int
    qualification: str
    reason: str