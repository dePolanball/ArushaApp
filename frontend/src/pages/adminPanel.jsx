// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { getRole } from "../auth";
import BackButton from "../components/BackButton";

const SUMMARY_IFRAME_SRC =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoqXFPevXQciUOddFRutMTDbulZDihx-S-y6pUbeMSsGUsNu2l8gk1V0TDHYjFtiozJPsJlBtvcqw4/pubhtml?gid=1029657384&single=true&widget=true&headers=false";

const ADMIN_KEY = "arusha_admins";
const MAX_ADMINS = 3;

function ResponsiveSheet({ src }) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <iframe
        title="Summary Sheet"
        src={src}
        style={{
          width: "100%",
          minWidth: 900,
          height: "70vh",
          border: "1px solid #bbb",
        }}
      />
    </div>
  );
}

export default function AdminPanel({ onLogout }) {
  const role = getRole();
  const isSuperadmin = role === "superadmin";

  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(ADMIN_KEY) || "[]");
    setAdmins(stored);
  }, []);

  function save(updated) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(updated));
    setAdmins(updated);
  }

  function addAdmin() {
    setError(null);

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (admins.includes(email)) {
      setError("Already an admin");
      return;
    }

    if (admins.length >= MAX_ADMINS) {
      setError("Maximum 3 admins allowed");
      return;
    }

    save([...admins, email]);
    setEmail("");
  }

  function removeAdmin(e) {
    save(admins.filter(a => a !== e));
  }

  return (
    <div className="app-frame">
      <div style={{ padding: 40 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <BackButton />
          <button onClick={onLogout}>Logout</button>
        </div>

        <h1>Admin Panel</h1>
        <p>
          Role: <strong>{role}</strong>
        </p>

        <h2>Alerts & Summaries</h2>

        <ResponsiveSheet src={SUMMARY_IFRAME_SRC} />

        {isSuperadmin && (
          <>
            <h2>Superadmin: Manage Admins</h2>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button onClick={addAdmin}>Add Admin</button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
              {admins.map(a => (
                <li key={a}>
                  {a}
                  <button onClick={() => removeAdmin(a)}>Remove</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
