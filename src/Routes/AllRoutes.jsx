import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { NotFoundPage } from "../Pages/NotFoundPage";
import { CreateTask } from "../Pages/CreateTask";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const isAuthenticated = useSelector((store) => store.userReducer.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if user is authenticated, otherwise redirect to login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route exact path="/dashboard" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/createtask" element={<CreateTask />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
