import { Link } from "react-router-dom";
import { getRole } from "../auth";

export default function TopNav() {
  const role = getRole();

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/view">View</Link>{" | "}
      <Link to="/analytics">Analytics</Link>

      {(role === "admin" || role === "superadmin") && (
        <>{" | "}Admin</>
      )}
    </div>
  );
}
