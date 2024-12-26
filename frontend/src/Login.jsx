import React, { useState } from "react";
import axios from "axios";
import "./assets/css/App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/admin/login", {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Redirect to redirection panel after successful login
      window.location.href = "/dashboard/redirections"; // Change this line
      setError("");
    } catch (err) {
      console.error("err", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2> Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submitBtn">
          Login
        </button>
        <button href="#signup" type="submit" className="submitBtn signUp">
          {" "}
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
