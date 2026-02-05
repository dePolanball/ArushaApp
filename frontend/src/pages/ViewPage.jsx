// src/pages/ViewPage.jsx
import { getRole } from "../auth";
import BackButton from "../components/BackButton";

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
        title="Google Sheet"
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

export default function ViewPage({ onLogout }) {
  const role = getRole();

  const SHEET_ID = "1dK_gR99ej2Yf_tWyBo83ZZTWJLQHspUN5PtcE0kwuhM";
  const GID = "1029657384";

  const EDIT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=${GID}`;
  const READ_ONLY_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/preview?gid=${GID}`;

  const sheetUrl = role === "viewer" ? READ_ONLY_URL : EDIT_URL;

  return (
    <div className="app-frame">
      <div style={{ padding: 40 }}>
        <BackButton />
        <button onClick={onLogout} style={{ marginLeft: 10 }}>
          Logout
        </button>

        <h1>{role === "viewer" ? "Viewer Dashboard" : "Admin Dashboard"}</h1>
        <p>
          Role: <strong>{role}</strong>
        </p>

        <p>
          {role === "viewer"
            ? "Read-only access"
            : "You can directly edit the sheet below"}
        </p>

        <ResponsiveSheet src={sheetUrl} />
      </div>
    </div>
  );
}
