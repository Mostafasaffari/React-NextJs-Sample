import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

const initializeStore = () =>
  createStore(
    combineReducers({
      ...reducers
    }),
    composeWithDevTools(applyMiddleware())
  );

export { initializeStore };
