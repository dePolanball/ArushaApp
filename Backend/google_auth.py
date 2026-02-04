from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_ID = (
    "163221323715-v4qb0717sl5np0vt9jssueh69q0v2u2i.apps.googleusercontent.com"
)

def verify_google_token(token: str):
    try:
        payload = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )
        return payload
    except Exception:
        return None
