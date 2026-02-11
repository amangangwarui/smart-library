import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // check token
  const token = localStorage.getItem("token");

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={navStyle}>
      <Link to="/books" style={linkStyle}>Books</Link>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <button onClick={handleLogout} style={btnStyle}>Logout</button>
    </div>
  );
};

const navStyle = {
  background: "#1976d2",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center"
};

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
  fontWeight: "bold"
};

const btnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Navbar;
