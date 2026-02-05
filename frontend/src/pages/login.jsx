import { GoogleLogin } from "@react-oauth/google";

export default function Login({ onLogin }) {
  return (
    <div className="app-frame">
      <GoogleLogin
        onSuccess={(res) => {
          onLogin(res.credential, "superadmin");
        }}
        onError={() => {
          alert("Google login failed");
        }}
        useOneTap={false}
      />
    </div>
  );
}
