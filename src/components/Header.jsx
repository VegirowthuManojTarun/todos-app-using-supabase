import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Cookies from "js-cookie";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    Cookies.remove("access_token");
    console.log("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>Welcome, {user?.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;