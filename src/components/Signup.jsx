import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


useEffect(() => {
    if (Cookies.get("access_token")) {
      navigate("/todolist"); // Redirect if already authenticated
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      // Sign up the user using Supabase's auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(`Signup failed: ${error.message}`);
        return;
      }

      console.log(data); // Debug: Check the response object

      setMessage(
        "Signup successful! Please check your email to confirm your account. Once verified, you can log in."
      );

      // Navigate to login after showing success message
      setTimeout(() => navigate("/login"), 1000); // Redirect to login after 1 seconds
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      <br />
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Login here</button>
      </p>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
