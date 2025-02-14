import React from "react";
import "./HomeComp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateMeal from "../create/CreateMeal";
import CreateEntry from "../create/CreateEntry";
import CreateRoutine from "../create/CreateRoutine";

const HomeComp = ({ image, name, description, view }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="homeCompContainer">
      <div className="imgCont">
        <img src={image} alt="" />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      {/* create */}
      <div className="buttons">
        <div className="createButton">
          <button onClick={() => setOpenPopup(true)}>
            <img src="/images/plus.png" alt="" />
          </button>
          <p>Add</p>
        </div>
        {/* view */}
        <div className="viewButton">
          <Link to={view}>
            <button>
              <img src="/images/eye.png" alt="" />
            </button>
          </Link>
          <p>View</p>
        </div>
      </div>
      {openPopup && name === "Meals" && <CreateMeal setOpen={setOpenPopup} />}
      {openPopup && name === "Entries" && (
        <CreateEntry setOpen={setOpenPopup} />
      )}
      {openPopup && name === "Routines" && (
        <CreateRoutine setOpen={setOpenPopup} />
      )}
    </div>
  );
};

export default HomeComp;
