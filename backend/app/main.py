from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import User, Lead

from app.routers.auth import router as auth_router
from app.routers.lead import router as lead_router
from app.routers.ai import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI SDR API",
    version="1.0.0"
)

# Allow React frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(lead_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "AI SDR Backend Running Successfully!"
    }