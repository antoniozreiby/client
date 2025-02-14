import React from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HomeComp from "../../components/homeComp/HomeComp";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="banner">
        <h1>Welcome to GymBuddy</h1>
        <p style={{ fontStyle: "italic" }}>
          Your Fitness, Your Progress, Your Way
        </p>
      </div>
      <div className="mainContainer">
        <HomeComp
          image="/images/planner.png"
          name="Entries"
          description="Keep track of your daily progress"
          view="/entries"
        />
        <HomeComp
          image="/images/routines.png"
          name="Routines"
          description="Add personalized routines"
          view="/routines"
        />
        <HomeComp
          image="/images/meal.png"
          name="Meals"
          description="Add personalized meals"
          view="/meals"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
