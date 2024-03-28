import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAILURE,
} from "./actionTypes";


const initialState = {
  tasks: JSON.parse(localStorage.getItem("taskData")) || [],
  error: null,
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        error: null,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
        error: null,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        error: null,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
        error: null,
      };
    case GET_ALL_TASKS_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export { taskReducer };
