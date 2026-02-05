import { getRole } from "../auth";

export default function Home({ onLogout }) {
  const role = getRole();

  return (
    <div className="app-frame">
      <div style={{ padding: 40 }}>
        <button onClick={onLogout}>Logout</button>

        <h1>Arusha App</h1>

        {role === "viewer" && (
          <>
            <p>Welcome to the Arusha App</p>
            <ul>
              <li>
                <a href="/view">Sheets</a>
              </li>
            </ul>
          </>
        )}

        {(role === "admin" || role === "superadmin") && (
          <>
            <p>Welcome, {role}</p>
            <ul>
              <li>
                <a href="/view">Sheets</a>
              </li>
              <li>
                <a href="/admin">Admin Panel</a>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
