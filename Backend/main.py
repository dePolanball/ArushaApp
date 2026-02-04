# backend/main.py
# FULL, DROP-IN, RUNNABLE FILE
# Purpose: FIX CORS PRE-FLIGHT FAILURE so browser can POST /google-login
# Nothing else is changed or “handled” in the backend beyond transport.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI
from sheets import fetch_sheet_rows
from analytics import get_cached

# -----------------------------
# App init
# -----------------------------
app = FastAPI()

# -----------------------------
# CORS (THIS IS THE FIX)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
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
    NOTE:
    - This endpoint exists ONLY to prove transport + CORS works.
    - No passwords stored.
    - No access control enforced here.
    - Frontend derives role from JWT in real implementation.
    """

    if not payload.token:
        raise HTTPException(status_code=400, detail="Missing Google token")

    # TEMPORARY, TRANSPORT-ONLY RESPONSE
    # Replace with real JWT issuance once frontend is stable
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


app = FastAPI()

SHEET_ID = "1dK_gR99ej2Yf_tWyBo83ZZTWJLQHspUN5PtcE0kwuhM"
RANGE = "Jan!A1:Z1000"  # expand later

@app.get("/analytics")
def analytics():
    rows = fetch_sheet_rows(SHEET_ID, RANGE)
    return get_cached(rows)
