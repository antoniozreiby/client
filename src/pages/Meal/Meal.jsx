import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../useFetch";
import { AuthContext } from "../../authContext";
import "./meal.css";
import { Link } from "react-router-dom";
import { serv_url } from "../../constants";
const URL = serv_url;

const Meal = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`${URL}/api/meals/${user._id}`);

  return (
    <div className="mealsView">
      <Navbar />

      <div className="mealsViewContainer">
        {data?.map((m, index) => (
          <div className="mealViewItem" key={index}>
            <div className="mealDetails">
              <div className="mealName">{m.name}</div>
              <div className="mealDesc">{m.description}</div>
              <div className="mealTime">{m.time} minutes</div>
              <div className="mealCat">{m.category}</div>
            </div>
            {m.recipe && (
              <Link
                to={m.recipe}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="mealLink">Watch Recipe Video</div>
              </Link>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Meal;
