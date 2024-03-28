import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { taskReducer } from "./taskReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userReducer,
  taskReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
