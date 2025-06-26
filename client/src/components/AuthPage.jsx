import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useTheme } from "../ThemeContext";

function AuthPage() {
  const { setUser } = useContext(UserContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  // State for signup
  const [signup, setSignup] = useState({ username: "", email: "", password: "" });
  const [signupMsg, setSignupMsg] = useState("");
  // State for login
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginMsg, setLoginMsg] = useState("");

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signup)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          navigate("/");
        } else {
          setSignupMsg(data.error || data.message || "Signup failed.");
        }
      })
      .catch(() => setSignupMsg("Signup error."));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          navigate("/");
        } else {
          setLoginMsg(data.error || data.message || "Login failed.");
        }
      })
      .catch(() => setLoginMsg("Login error."));
  };

  // Styling
  const pageStyle = {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme === "dark" ? "#181926" : "#f2e9e4",
    transition: "background 0.3s"
  };
  const cardStyle = {
    background: theme === "dark" ? "#232946" : "#fff",
    borderRadius: 16,
    boxShadow: theme === "dark" ? "0 4px 24px #0006" : "0 4px 24px #0002",
    padding: 36,
    display: "flex",
    gap: 40,
    minWidth: 700,
    justifyContent: "center",
    color: theme === "dark" ? "#e0e0e0" : "#22223b"
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minWidth: 280
  };
  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: theme === "dark" ? "1px solid #393e46" : "1px solid #c9ada7",
    fontSize: 16,
    outline: "none",
    background: theme === "dark" ? "#232946" : "#f8f8fa",
    color: theme === "dark" ? "#e0e0e0" : "#22223b"
  };
  const buttonStyle = {
    padding: "10px 0",
    background: theme === "dark" ? "#393e46" : "#4a4e69",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8
  };
  const labelStyle = {
    fontWeight: 500,
    marginBottom: 2
  };
  const msgStyle = (success) => ({
    color: success ? "#388e3c" : "#b00020",
    fontWeight: 500,
    marginTop: 4
  });

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div>
          <h2 style={{ marginBottom: 18, color: theme === "dark" ? "#e0e0e0" : "#22223b" }}>Sign Up</h2>
          <form onSubmit={handleSignup} style={formStyle} autoComplete="on">
            <label style={labelStyle}>Username</label>
            <input name="username" value={signup.username} onChange={handleSignupChange} style={inputStyle} placeholder="Username" required autoComplete="username" />
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={signup.email} onChange={handleSignupChange} style={inputStyle} placeholder="Email" required autoComplete="email" />
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={signup.password} onChange={handleSignupChange} style={inputStyle} placeholder="Password" required autoComplete="new-password" />
            <button type="submit" style={buttonStyle}>Sign Up</button>
            {signupMsg && <div style={msgStyle(signupMsg.toLowerCase().includes("success"))}>{signupMsg}</div>}
          </form>
        </div>
        <div>
          <h2 style={{ marginBottom: 18, color: theme === "dark" ? "#e0e0e0" : "#22223b" }}>Log In</h2>
          <form onSubmit={handleLogin} style={formStyle} autoComplete="on">
            <label style={labelStyle}>Username</label>
            <input name="username" value={login.username} onChange={handleLoginChange} style={inputStyle} placeholder="Username" required autoComplete="username" />
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={login.password} onChange={handleLoginChange} style={inputStyle} placeholder="Password" required autoComplete="current-password" />
            <button type="submit" style={buttonStyle}>Log In</button>
            {loginMsg && <div style={msgStyle(loginMsg.toLowerCase().includes("success"))}>{loginMsg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage; 