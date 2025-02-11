import React, { useContext } from "react";
import "./landing.css";
import { AuthContext } from "../../authContext";
import { Link } from "react-router-dom";

const Landing = () => {
  const { user } = useContext(AuthContext);
  localStorage.removeItem("user");

  return (
    <div className="landing">
      <div className="header">
        <div className="upper-layer">
          <img className="img" src="/weightlifting.png" alt="" />
          <h1>
            Welcome to<span className="brand-name">GymBuddy</span>
          </h1>
          <Link to={user ? "/home" : "/login"}>
            <button className="btn-get-started">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
