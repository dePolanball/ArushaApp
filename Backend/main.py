# backend/main.py
# FULL, DROP-IN, RUNNABLE FILE
# Purpose: FIX CORS PRE-FLIGHT FAILURE so browser can POST /google-login
# Backend is transport-only. No analytics. No server compute.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# -----------------------------
# App init
# -----------------------------
app = FastAPI()

# -----------------------------
# CORS (FIXES PREFLIGHT)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://dePolanball.github.io"
        # add your deployed frontend here later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request / Response models
# -----------------------------
class GoogleLoginRequest(BaseModel):
    token: str


class GoogleLoginResponse(BaseModel):
    access_token: str
    role: str


# -----------------------------
# Routes
# -----------------------------
@app.post("/google-login", response_model=GoogleLoginResponse)
def google_login(payload: GoogleLoginRequest):
    """
    Transport-only endpoint.
    Proves CORS + POST works.
    No auth logic enforced here.
    """

    if not payload.token:
        raise HTTPException(status_code=400, detail="Missing Google token")

    return GoogleLoginResponse(
        access_token=payload.token,
        role="superadmin",
    )


# -----------------------------
# Health check
# -----------------------------
@app.get("/health")
def health():
    return {"status": "ok"}
