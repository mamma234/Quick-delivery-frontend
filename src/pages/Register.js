import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post("/register", { email, password });
      navigate("/login");
    } catch {
      setErr("Registration failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      <button type="submit">Register</button>
    </form>
  );
}
