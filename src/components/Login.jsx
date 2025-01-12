import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabaseClient";

const Login = () => {

  useEffect(() => {
    if (Cookies.get("access_token")) {
      navigate("/todolist"); // Redirect if already authenticated
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Invalid email or password!");
      } else {
        const user = data.user;

        Cookies.set("access_token", data.session.access_token, {
          secure: true,
          expires: 7, // Token expires in 7 days
        });

        setUser(user);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/todolist"), 1000);
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>{" "}
      <br />
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign up here</button>
      </p>{" "}
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;