// src/pages/ViewSheet.jsx
import { useState } from "react";
import TopNav from "../components/TopNav";
import SheetEmbed from "../components/SheetEmbed";
import api from "../api";
import { getRole } from "../auth";

function ResponsiveEmbed({ sheetId, gid }) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div style={{ minWidth: 900 }}>
        <SheetEmbed sheetId={sheetId} gid={gid} />
      </div>
    </div>
  );
}

export default function ViewSheet() {
  const role = getRole();

  const SHEET_ID = "DEV_SHEET_ID_HERE";
  const [gid, setGid] = useState("0");

  const [sheet, setSheet] = useState("");
  const [values, setValues] = useState("");
  const [column, setColumn] = useState("");
  const [formula, setFormula] = useState("");

  async function addRow() {
    await api.post("/transaction", {
      sheet,
      values: values.split(",").map(v => v.trim()),
    });
    alert("Row added");
  }

  async function addColumn() {
    await api.post("/add-column", {
      sheet,
      column_name: column,
      formula: formula || null,
    });
    alert("Column added");
  }

  return (
    <div className="app-frame">
      <div style={{ padding: 40 }}>
        <TopNav />
        <h1>View / Update Sheet</h1>

        <label>Sheet GID:</label>
        <input value={gid} onChange={e => setGid(e.target.value)} />

        <ResponsiveEmbed sheetId={SHEET_ID} gid={gid} />

        {(role === "admin" || role === "superadmin") && (
          <>
            <h3>Admin Controls</h3>

            <h4>Add Row</h4>
            <input
              placeholder="Sheet name"
              onChange={e => setSheet(e.target.value)}
            />
            <input
              placeholder="Comma separated values"
              onChange={e => setValues(e.target.value)}
            />
            <button onClick={addRow}>Add Row</button>

            <h4>Add Column</h4>
            <input
              placeholder="Sheet name"
              onChange={e => setSheet(e.target.value)}
            />
            <input
              placeholder="Column name"
              onChange={e => setColumn(e.target.value)}
            />
            <input
              placeholder="Formula (optional)"
              onChange={e => setFormula(e.target.value)}
            />
            <button onClick={addColumn}>Add Column</button>
          </>
        )}
      </div>
    </div>
  );
}
