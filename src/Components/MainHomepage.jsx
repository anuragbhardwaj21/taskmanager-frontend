import React from "react";
import "./MainHomepage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../Redux/action";

export const MainHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.userReducer.currentUser);
  const tasks = useSelector((store) => store.taskReducer.tasks);

  const handleCreateTaskClick = () => {
    navigate("/createtask");
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdateTask = (taskId) => {
    // You can redirect user to the update task page or handle the update logic here
    console.log("Update task with id:", taskId);
  };

  return (
    <div className="mainhomepage">
      <div className="uppermainhomepage">
        <h2>Welcome back, {currentUser.username}</h2>
        <button onClick={handleCreateTaskClick}>Create Task</button>
      </div>

      <div className="taskcontainer">
        <div className="pending">
          <h3>Pending Tasks</h3>
          {tasks
            .filter((task) => task.status === "pending")
            .map((task) => (
              <div key={task._id} className="task">
                <p>Title: {task.title}</p>
                <p>Status: {task.status}</p>
                <p>Created: {new Date(task.created).toLocaleDateString()}</p>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTask(task._id)}>
                  Update
                </button>
              </div>
            ))}
        </div>
        <div className="inprogress">
          <h3>In Progress Tasks</h3>
          {tasks
            .filter((task) => task.status === "in progress")
            .map((task) => (
              <div key={task._id} className="task">
                <p>Title: {task.title}</p>
                <p>Status: {task.status}</p>
                <p>Created: {new Date(task.created).toLocaleDateString()}</p>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTask(task._id)}>
                  Update
                </button>
              </div>
            ))}
        </div>
        <div className="done">
          <h3>Completed Tasks</h3>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div key={task._id} className="task">
                <p>Title: {task.title}</p>
                <p>Status: {task.status}</p>
                <p>Created: {new Date(task.created).toLocaleDateString()}</p>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTask(task._id)}>
                  Update
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
