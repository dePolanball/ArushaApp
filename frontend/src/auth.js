import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "arusha_token";
const ROLE_KEY = "arusha_role";
const EMAIL_KEY = "arusha_email";
const ADMIN_KEY = "arusha_admins";

// 🔒 CHANGE THIS TO YOUR EMAIL (SUPERADMIN)
const SUPERADMIN_EMAIL = "riturab@gmail.com";

export function saveAuth(token) {
  const decoded = jwtDecode(token);
  const email = decoded.email;

  const admins = JSON.parse(localStorage.getItem(ADMIN_KEY) || "[]");

  let role = "viewer";

  if (email === SUPERADMIN_EMAIL) {
    role = "superadmin";
  } else if (admins.includes(email)) {
    role = "admin";
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function getEmail() {
  return localStorage.getItem(EMAIL_KEY);
}
