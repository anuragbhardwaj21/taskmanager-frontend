import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/action";

export const Login = () => {
  document.title = "Login";

  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");
  let isAuthenticated = useSelector(
    (store) => store.userReducer.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      console.log("Please Enter Details");
      return;
    }
    dispatch(login(email, password));
  };
  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <div>
      <Navbar />
      <div className="loginform">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="Email"
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <input type="submit" value="Sign In" />
          <p>
            <Link to="/">Forgot your password?</Link> /
            <Link to="/signup"> Create account</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};
