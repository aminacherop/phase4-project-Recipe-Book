import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useTheme } from "../ThemeContext";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", { method: "DELETE", credentials: "include" })
      .then(() => {
        setUser(null);
        navigate("/");
      });
  };

  const navStyle = {
    padding: "1rem 2rem",
    background: theme === "dark" ? "#181926" : "#22223b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px #0002",
    position: "sticky",
    top: 0,
    zIndex: 1000
  };
  const linkStyle = {
    color: theme === "dark" ? "#e0e0e0" : "#f2e9e4",
    textDecoration: "none",
    marginRight: "1.5rem",
    fontWeight: 500,
    fontSize: 17,
    transition: "color 0.2s"
  };
  const linkHover = {
    color: theme === "dark" ? "#c9ada7" : "#c9ada7"
  };
  const userAreaStyle = {
    background: theme === "dark" ? "#232946" : "#4a4e69",
    color: theme === "dark" ? "#e0e0e0" : "#f2e9e4",
    padding: "0.5rem 1rem",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 15,
    fontWeight: 500
  };
  const buttonStyle = {
    marginLeft: 10,
    background: theme === "dark" ? "#393e46" : "#9a8c98",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "0.3rem 0.9rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    transition: "background 0.2s"
  };
  const toggleStyle = {
    marginLeft: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 22,
    color: theme === "dark" ? "#e0e0e0" : "#f2e9e4"
  };

  // For hover effect, use onMouseEnter/onMouseLeave for demo (or migrate to CSS for real app)
  const [hovered, setHovered] = React.useState("");
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/recipes/new", label: "Add Recipe" },
    { to: "/my-favorites", label: "Favorites" },
    { to: "/login", label: "Login" }
  ];

  return (
    <nav style={navStyle}>
      <div>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={hovered === link.to ? { ...linkStyle, ...linkHover } : linkStyle}
            onMouseEnter={() => setHovered(link.to)}
            onMouseLeave={() => setHovered("")}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={userAreaStyle}>
        {user ? (
          <>
            <span>Logged in as <b>{user.username}</b></span>
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
        <button style={toggleStyle} onClick={toggleTheme} title="Toggle dark/light mode">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
