import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./inkwash.css";

const GOOGLE_CLIENT_ID =
  "163221323715-v4qb0717sl5np0vt9jssueh69q0v2u2i.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <HashRouter>
      <App />
    </HashRouter>
  </GoogleOAuthProvider>
);
