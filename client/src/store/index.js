import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "./reducers/alert-reducer";
import authReducer from "./reducers/auth";
import setAuthToken from "../utils/setAuthToken";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
});

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
