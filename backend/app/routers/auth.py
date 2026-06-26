from fastapi import APIRouter
from fastapi import Depends
from app.dependencies import get_current_user

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.auth_schema import RegisterRequest
from app.schemas.auth_schema import LoginRequest

from app.services.auth_service import register_user
from app.services.auth_service import login_user
from app.services.auth_service import get_current_user

from app.utils.jwt_handler import verify_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)




@router.post("/register")
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):

    return register_user(
        user,
        db
    )


@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    return login_user(
        user.email,
        user.password,
        db
    )


@router.get("/me")
def me(
    current_user=Depends(get_current_user)
):
    return current_user