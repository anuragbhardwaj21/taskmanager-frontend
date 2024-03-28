import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import task from "../images/task.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/action";

export const Navbar = () => {
  const navigate = useNavigate();
  let isAuthenticated = useSelector(
    (store) => store.userReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigateToHomepage = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img src={task} alt="" />
      <h2 onClick={navigateToHomepage}>Task Manager</h2>
      {isAuthenticated ? (
        <button onClick={handleLogoutClick}>
          <ion-icon name="log-out-outline"></ion-icon>
        </button>
      ) : (
        <button onClick={handleLoginClick}>
          <ion-icon name="log-in-outline"></ion-icon>
        </button>
      )}
    </div>
  );
};
