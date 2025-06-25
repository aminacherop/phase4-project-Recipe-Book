import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/recipes/new" style={{ marginRight: "1rem" }}>Add Recipe</Link>
      <Link to="/my-favorites" style={{ marginRight: "1rem" }}>Favorites</Link>
      <Link to="/signup" style={{ marginRight: "1rem" }}>Signup</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default NavBar;
