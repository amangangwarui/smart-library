// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const nav = useNavigate();
//   const logout = () => {
//     localStorage.removeItem("token");
//     nav("/login");
//   };

//   return (
//     <div style={{ padding: 10, background: "#1877f2", color: "white" }}>
//       <Link to="/books" style={{ color: "white", marginRight: 10 }}>Books</Link>
//       <Link to="/dashboard" style={{ color: "white", marginRight: 10 }}>Dashboard</Link>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }



import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ background: "#1976d2", padding: "10px 20px" }}>
      <Link to="/books" style={linkStyle}>Books</Link>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <button onClick={handleLogout} style={btnStyle}>Logout</button>
    </div>
  );
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
