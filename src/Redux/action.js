import axios from "axios";
import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  CURRENT_USER,
  IS_AUTHENTICATED,
  LOG_OUT_USER,
  LOGIN_FAILURE,
} from "./actionTypes";

export const signupSuccess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData,
});

export const signupFailure = (value) => ({
  type: SIGNUP_FAILURE,
  payload: value,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const setCurrentUser = (userData) => ({
  type: CURRENT_USER,
  payload: userData,
});

export const setIsAuthenticated = (value) => ({
  type: IS_AUTHENTICATED,
  payload: value,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const loginFailure = (value) => ({
  type: LOGIN_FAILURE,
  payload: value,
});

//

export const addTaskSuccess = (taskData) => ({
  type: ADD_TASK_SUCCESS,
  payload: taskData,
});

export const addTaskFailure = () => ({
  type: ADD_TASK_FAILURE,
});

export const updateTaskSuccess = (taskData) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: taskData,
});

export const updateTaskFailure = () => ({
  type: UPDATE_TASK_FAILURE,
});

export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTaskFailure = () => ({
  type: DELETE_TASK_FAILURE,
});

export const getAllTasksSuccess = (tasksData) => ({
  type: GET_ALL_TASKS_SUCCESS,
  payload: tasksData,
});

export const getAllTasksFailure = () => ({
  type: GET_ALL_TASKS_FAILURE,
});

//

export const signupUser = (name, email, password) => (dispatch) => {
  axios
    .post("https://taskmanager-backend-rgxa.onrender.com/signup", { name, email, password })
    .then((response) => {
      const { username, userid, token } = response.data;
      const userData = { username, userid, token };

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(signupSuccess(userData));
      dispatch(setCurrentUser(userData));
      dispatch(setIsAuthenticated(true));
    })
    .catch((error) => {
      dispatch(signupFailure(true));
      console.error("Signup Error", error);
    });
};

export const login = (email, password) => (dispatch) => {
  axios
    .post("https://taskmanager-backend-rgxa.onrender.com/login", { email, password })
    .then((response) => {
      dispatch(loginFailure(false));
      const { username, userid, token } = response.data;
      const userData = { username, userid, token };
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(loginSuccess(true));
      dispatch(setCurrentUser(userData));
      dispatch(setIsAuthenticated(true));
      dispatch(getAllTasks());
    })
    .catch((error) => {
      dispatch(loginFailure(true));
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("taskData");
  dispatch(logOutUser());
  dispatch(setIsAuthenticated(false));
};

//

export const addTask = (title, status) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .post(
      "https://taskmanager-backend-rgxa.onrender.com/addtask",
      { title, status },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    )
    .then((response) => {
      dispatch(addTaskSuccess(response.data));
      dispatch(getAllTasks());
    })
    .catch((error) => {
      dispatch(addTaskFailure());
      console.error("Add Task Error", error);
    });
};

export const updateTask = (taskId, title, status, deadline) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .put(
      `https://taskmanager-backend-rgxa.onrender.com/updatetask/${taskId}`,
      { title, status, deadline },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    )
    .then((response) => {
      dispatch(updateTaskSuccess(response.data));
      dispatch(getAllTasks());
    })
    .catch((error) => {
      dispatch(updateTaskFailure());
      console.error("Update Task Error", error);
    });
};

export const deleteTask = (taskId) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .delete(`https://taskmanager-backend-rgxa.onrender.com/deletetask/${taskId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then(() => {
      dispatch(deleteTaskSuccess(taskId));
    })
    .catch((error) => {
      dispatch(deleteTaskFailure());
      console.error("Delete Task Error", error);
    });
};

export const getAllTasks = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("userData")).userid;
  axios
    .get(
      `https://taskmanager-backend-rgxa.onrender.com/alltasks?userId=${userId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    )
    .then((response) => {
      dispatch(getAllTasksSuccess(response.data));
      localStorage.setItem("taskData", JSON.stringify(response.data));
    })
    .catch((error) => {
      dispatch(getAllTasksFailure());
      console.error("Get All Tasks Error", error);
    });
};
