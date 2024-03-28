import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { NotFoundPage } from "../Pages/NotFoundPage";
import { CreateTask } from "../Pages/CreateTask";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
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
