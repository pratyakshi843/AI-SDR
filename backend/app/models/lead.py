from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy import Text
from app.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    company = Column(
        String,
        nullable=False
    )

    contact_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="New"
    )

    qualification = Column(
        String,
        nullable=True
    )

    lead_score = Column(
    String,
    nullable=True
)
    reason = Column(
    Text,
    nullable=True
)
    generated_email = Column(
        String,
        nullable=True
    )

    owner_id = Column(
        String,
        ForeignKey("users.id")
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    owner = relationship(
        "User",
        back_populates="leads"
    )