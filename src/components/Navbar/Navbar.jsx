import "./navbar.css";
import { useContext } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navContainer">
      <Link to="/home">
        <p className="navLogo">GymBuddy</p>
      </Link>

      <input type="checkbox" id="menu-bar" />
      <label htmlFor="menu-bar">
        <FontAwesomeIcon icon={faBars} className="icon" />
      </label>
      <nav className="navbar">
        <ul>
          <Link to="/routines">
            <li>
              <p>Routine</p>
            </li>
          </Link>
          <Link to="/meals">
            <li>
              <p>Meal</p>
            </li>
          </Link>
          <Link to="/entries">
            <li>
              <p>Entries</p>
            </li>
          </Link>
          {user ? (
            <>
              <li onClick={handleClick} style={{ cursor: "pointer" }}>
                <p>Logout</p>
              </li>
              <li>
                <div className="profilePicture">
                  <img src={"/images/GymPerson.png"} alt="" />
                </div>
              </li>
              <li id="usernamename">
                <p>{user.username}</p>
              </li>
            </>
          ) : (
            <>
              <Link to="/register">
                <li>
                  <p>Register</p>
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <p>Login</p>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
