import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  isAuthenticate: false,
  token: localStorage.getItem("token"),
  isLoading: false,
  user: null,
};

export const register = createAsyncThunk("/register", async (user) => {
  const response = await api.post("/users", user);

  return response.data;
});

export const login = createAsyncThunk("login", async ({ email, password }) => {
  const body = { email, password };
  const response = await api.post("/auth", body);

  return response.data;
});

export const authorizeUser = createAsyncThunk("authorizeUser", async () => {
  const response = await api.get("/auth");

  return response.data;
});

export const logout = createAction("LOGOUT");

const authReducer = createReducer(initialState, {
  [register.pending]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [register.fulfilled]: (state, action) => {
    const token = action.payload?.token;

    return {
      ...state,
      token,
      isLoading: false,
    };
  },
  [register.rejected]: (state, action) => {
    const error = action.error;

    console.log("error", error);
    return {
      ...state,
      token: "",
      isLoading: false,
    };
  },
  [login.pending]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [login.fulfilled]: (state, action) => {
    const token = action.payload?.token;

    console.log("token", token);
    return {
      ...state,
      isLoading: false,
      isAuthenticate: true,
      token,
    };
  },
  [login.rejected]: (state, action) => {
    console.log("error", action.error);
    return {
      ...state,
      isLoading: false,
    };
  },
  [authorizeUser.pending]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [authorizeUser.fulfilled]: (state, action) => {
    return {
      ...state,
      isAuthenticate: true,
      isLoading: false,
      user: action.payload,
    };
  },
  [authorizeUser.rejected]: (state) => {
    return {
      ...state,
      isAuthenticate: false,
      isLoading: false,
      user: null,
    };
  },
  [logout]: (state) => {
    return {
      ...state,
      token: null,
      isAuthenticate: false,
      isLoading: false,
    };
  },
});

export default authReducer;
