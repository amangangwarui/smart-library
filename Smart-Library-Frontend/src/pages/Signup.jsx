import api from "../api/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    await api.post("/auth/signup", { name, email, password });
    nav("/login");
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Signup</button>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}
