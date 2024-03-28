import React, { useState } from "react";
import "./MainHomepage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../Redux/action";

export const MainHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.userReducer.currentUser);
  const tasks = useSelector((store) => store.taskReducer.tasks);
  const [updatedTask, setUpdatedTask] = useState(null);

  const handleCreateTaskClick = () => {
    navigate("/createtask");
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdateTask = (task) => {
    setUpdatedTask(task);
  };

  const handleDoneUpdate = () => {
    if (updatedTask) {
      dispatch(
        updateTask(updatedTask._id, updatedTask.title, updatedTask.status)
      );
      setUpdatedTask(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
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
              <div
                key={task._id}
                className={
                  updatedTask && updatedTask._id === task._id
                    ? "updatetask"
                    : "task"
                }
              >
                {updatedTask && updatedTask._id === task._id ? (
                  <div className="updatetaskinner">
                    <input
                      type="text"
                      name="title"
                      value={updatedTask.title}
                      onChange={handleInputChange}
                    />
                    <select
                      name="status"
                      value={updatedTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button onClick={handleDoneUpdate}>Done</button>
                  </div>
                ) : (
                  <>
                    <h4>Title: {task.title}</h4>
                    <p>Status: {task.status}</p>
                    <p>
                      Created: {new Date(task.created).toLocaleDateString()}
                    </p>
                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateTask(task)}>
                      Update
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="inprogress">
          <h3>In Progress Tasks</h3>
          {tasks
            .filter((task) => task.status === "in progress")
            .map((task) => (
              <div
                key={task._id}
                className={
                  updatedTask && updatedTask._id === task._id
                    ? "updatetask"
                    : "task"
                }
              >
                {updatedTask && updatedTask._id === task._id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={updatedTask.title}
                      onChange={handleInputChange}
                    />
                    <select
                      name="status"
                      value={updatedTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button onClick={handleDoneUpdate}>Done</button>
                  </div>
                ) : (
                  <>
                    <h4>Title: {task.title}</h4>
                    <p>Status: {task.status}</p>
                    <p>
                      Created: {new Date(task.created).toLocaleDateString()}
                    </p>
                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateTask(task)}>
                      Update
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="done">
          <h3>Completed Tasks</h3>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div
                key={task._id}
                className={
                  updatedTask && updatedTask._id === task._id
                    ? "updatetask"
                    : "task"
                }
              >
                {updatedTask && updatedTask._id === task._id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={updatedTask.title}
                      onChange={handleInputChange}
                    />
                    <select
                      name="status"
                      value={updatedTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button onClick={handleDoneUpdate}>Done</button>
                  </div>
                ) : (
                  <>
                    <h4>Title: {task.title}</h4>
                    <p>Status: {task.status}</p>
                    <p>
                      Created: {new Date(task.created).toLocaleDateString()}
                    </p>
                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateTask(task)}>
                      Update
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
