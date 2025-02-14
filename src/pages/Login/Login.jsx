import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authContext";
import Swal from "sweetalert2";
import { serv_url } from "../../constants";
const URL = serv_url;
function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(URL);
    if (!credentials.username || !credentials.password) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please provide both username and password.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URL}/api/auth/login`, credentials);
      console.log(URL);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      Swal.fire({
        title: "Success!",
        text: " Login successful !",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "An error occurred while logging in",
        });
      }
      if (err.response && err.response.status === 404) {
        Swal.fire({
          title: "User Doesn't exist",
          text: "Please Register a New User.",
          icon: "error",
          confirmButtonText: "Go to Register Page",
        }).then(() => {
          navigate("/register");
        });
      }
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Welcome Gym Rat!</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Login
              </button>
            </div>
            <div className="signup_link">
              <p>Not registered? </p>
              <Link className="Link">
                Contact Your Coach to create your account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
