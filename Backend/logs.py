from datetime import datetime
import csv
import os

LOG_FILE = "admin_logs.csv"
LOG_FIELDS = ["timestamp_utc", "admin_username", "action", "details"]

# ensure file exists with header
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w", newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=LOG_FIELDS)
        writer.writeheader()

def log_action(username: str, action: str, details: str):
    # do not log superadmin (root)
    if username == "root":
        return
    with open(LOG_FILE, "a", newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=LOG_FIELDS)
        writer.writerow({
            "timestamp_utc": datetime.utcnow().isoformat(),
            "admin_username": username,
            "action": action,
            "details": details
        })
