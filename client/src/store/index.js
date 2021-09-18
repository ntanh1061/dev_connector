import { configureStore } from "@reduxjs/toolkit";

import setAuthToken from "../utils/setAuthToken";
import alertReducer from "./reducers/alert-reducer";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
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
