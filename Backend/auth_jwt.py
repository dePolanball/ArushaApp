import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# -------------------------------------------------
# Load environment variables
# -------------------------------------------------

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY not set in .env")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="google-login")

# -------------------------------------------------
# JWT Creation
# -------------------------------------------------

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# -------------------------------------------------
# JWT Validation
# -------------------------------------------------

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")

        if username is None or role is None:
            raise credentials_exception

        return {
            "username": username,
            "role": role
        }

    except JWTError:
        raise credentials_exception

# -------------------------------------------------
# Role Guards
# -------------------------------------------------

def require_super(user: dict):
    if user.get("role") != "super":
        raise HTTPException(
            status_code=403,
            detail="Superadmin privileges required"
        )

def require_admin_or_super(user: dict):
    if user.get("role") not in ["admin", "super"]:
        raise HTTPException(
            status_code=403,
            detail="Admin privileges required"
        )
