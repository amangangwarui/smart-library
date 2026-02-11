import api from "../api/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const submit = async () => {
    if (loading) return; // 🚫 prevent multiple calls
    setLoading(true);

    try {
      await api.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
