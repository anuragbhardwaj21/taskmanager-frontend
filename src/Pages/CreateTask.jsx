import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/action";
import { useNavigate } from "react-router-dom";

export const CreateTask = () => {
  document.title = "Create Task";
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("status");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask(title, status));

    setTitle("");
    setStatus("status");
    navigate('/')
  };

  const isDisabled = title === "" && status === "status";
  return (
    <div>
      <Navbar />
      <div className="maincreatetask">
        <h1>Create Task</h1>
        <p className={isDisabled ? "warningnothidden" : "warninghidden"}>
          Please enter task details
        </p>
        <form className="createtaskform" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="status">Status</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="in progress">In Progress</option>
          </select>
          <button type="submit" value="Create Task" disabled={isDisabled}>
            Create task
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
