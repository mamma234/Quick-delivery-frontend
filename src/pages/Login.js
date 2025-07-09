import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      setErr("Login failed. Check credentials.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      <button type="submit">Login</button>
      <div>
        No account? <a href="/register">Register</a>
      </div>
    </form>
  );
}
