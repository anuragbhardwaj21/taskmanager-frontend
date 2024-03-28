import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  IS_AUTHENTICATED,
  LOG_OUT_USER,
  CURRENT_USER,
} from "./actionTypes";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("userData")) || {},
  isAuthenticated: localStorage.getItem("token") ? true : false,
  signupSuccess: false,
  loginSuccess: false,
  loginFailure: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER:
      return { ...state, currentUser: payload, isAuthenticated: true };
    case SIGNUP_SUCCESS:
      return { ...state, signupSuccess: true };
    case SIGNUP_FAILURE:
      return { ...state, signupSuccess: false };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, loginSuccess: true };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loginSuccess: false,
        loginFailure: true,
      };
    case LOG_OUT_USER:
      return { ...state, currentUser: {}, isAuthenticated: false };
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: payload };
    default:
      return state;
  }
};

export { userReducer };
