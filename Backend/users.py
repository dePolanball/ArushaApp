import json

USERS_FILE = "users.json"

def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)["users"]
    except:
        return []

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=2)

def find_user(email):
    for u in load_users():
        if u["email"] == email:
            return u
    return None

def add_user(email, role):
    users = load_users()
    if find_user(email):
        return
    users.append({"email": email, "role": role})
    save_users(users)
