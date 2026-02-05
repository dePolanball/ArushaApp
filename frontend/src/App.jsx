import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ViewPage from "./pages/viewpage";
import Home from "./pages/Home";
import { saveAuth, clearAuth, getToken, getRole } from "./auth";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = getToken();
    const r = getRole();
    if (t && r) {
      setToken(t);
      setRole(r);
    }
    setBooted(true);
  }, []);

  function handleLogin(token, role) {
    saveAuth(token, role);
    setToken(token);
    setRole(role);
  }

  function handleLogout() {
    clearAuth();
    setToken(null);
    setRole(null);
  }

  if (!booted) return null;

  if (!token || !role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home onLogout={handleLogout} />} />
      <Route path="/view" element={<ViewPage onLogout={handleLogout} />} />
      <Route path="/admin" element={<AdminPanel onLogout={handleLogout} />} />

      <Route
        path="*"
        element={
          role === "admin" || role === "superadmin"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/view" replace />
        }
      />
    </Routes>
  );
}
