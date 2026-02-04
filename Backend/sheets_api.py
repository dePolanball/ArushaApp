from __future__ import print_function
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# Google official scope
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

SPREADSHEET_ID = "1dK_gR99ej2Yf_tWyBo83ZZTWJLQHspUN5PtcE0kwuhM"

# -------------------------
# AUTH (Google Quickstart)
# -------------------------

def get_service():
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json",
                SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    service = build("sheets", "v4", credentials=creds)
    return service

# -------------------------
# GET ALL SHEET NAMES
# -------------------------

def get_all_sheet_names():
    service = get_service()
    spreadsheet = service.spreadsheets().get(
        spreadsheetId=SPREADSHEET_ID
    ).execute()

    sheets = spreadsheet.get("sheets", [])
    names = []

    for sheet in sheets:
        names.append(sheet["properties"]["title"])

    return names

# -------------------------
# READ ALL SHEETS
# -------------------------

def read_all_sheets():
    service = get_service()
    sheet_names = get_all_sheet_names()

    data = {}

    for name in sheet_names:
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"{name}"
        ).execute()

        data[name] = result.get("values", [])

    return data

def append_transaction_to_sheet(sheet_name: str, values: list):
    """
    Appends a single row to the specified sheet.
    values must be a LIST representing one row.
    """

    service = get_service()

    body = {
        "values": [values]
    }

    result = service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=f"{sheet_name}!A1",
        valueInputOption="USER_ENTERED",
        insertDataOption="INSERT_ROWS",
        body=body
    ).execute()

    return result
def add_column_to_sheet(sheet_name, column_name, formula=None):
    service = get_service()

    # Find first empty column by reading header
    result = service.spreadsheets().values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=f"{sheet_name}!1:1"
    ).execute()

    headers = result.get("values", [[]])[0]
    col_index = len(headers)

    col_letter = chr(ord("A") + col_index)

    # Set header
    service.spreadsheets().values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=f"{sheet_name}!{col_letter}1",
        valueInputOption="USER_ENTERED",
        body={"values": [[column_name]]}
    ).execute()

    # Set formula if exists
    if formula:
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=f"{sheet_name}!{col_letter}2:{col_letter}",
            valueInputOption="USER_ENTERED",
            body={"values": [[formula]]}
        ).execute()
