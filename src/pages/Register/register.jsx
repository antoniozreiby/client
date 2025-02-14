import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { serv_url } from "../../constants";
const URL = serv_url;

function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let profileUrl = "";

      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(`${URL}/api/image/upload`, data, {
          withCredentials: false,
        });

        profileUrl = uploadRes.data.url;
      }

      const newUser = {
        ...info,
        profilePicture: profileUrl,
      };

      await axios.post(`${URL}/api/auth/register`, newUser, {
        withCredentials: false,
      });

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        Swal.fire({
          title: "Email is already in use!",
          text: "Please use another one.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (err.response && err.response.status === 500) {
        Swal.fire({
          title: "User Name already in use!",
          text: "Please use another one.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Oops",
          text: "Something went Worng ",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>

          <form>
            <div className="formInput">
              <div className="txt_field">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleChange}
                  id="username"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  //   value={data.password}
                  required
                />
              </div>
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already Registered? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
