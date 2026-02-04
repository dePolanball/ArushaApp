from passlib.context import CryptContext

# Use Argon2 (recommended for new systems). Verified via FastAPI / Passlib docs.
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def get_password_hash(password: str) -> str:
    """Hash a plain password using Argon2 (via passlib)."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its Argon2 hash."""
    return pwd_context.verify(plain_password, hashed_password)
