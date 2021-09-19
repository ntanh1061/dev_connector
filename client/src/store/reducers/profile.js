import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

import api from "../../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert-reducer";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  profile: {},
};

export const addProfile = createAsyncThunk("/profile", async (profile, {dispatch}) => {
  const response = await api.post("/profile", profile);

  dispatch(setAlert("Add/Update Profile Successfully", "success"));
  return response.data;
});

export const getProfile = createAsyncThunk("/profile/me", async () => {
  const response = await api.get("/profile/me");

  return response.data;
});

export const addExperience = createAsyncThunk(
  "/profile-add-experience",
  async (experience, {dispatch}) => {
    const response = await api.put("/profile/add-experience", experience);

    dispatch(setAlert("Add Experience Successfully", "success"));
    return response.data;
  }
);

export const addEducation = createAsyncThunk(
  "/profile/add-education",
  async (education, {dispatch}) => {
    const response = await api.put("/profile/add-education", education);

    dispatch(setAlert("Add Education Successfully", "success"));
    return response.data;
  }
);

export const deleteEducation = createAsyncThunk(
  "/profile/delete-education",
  async (id, { dispatch }) => {
    const response = await api.delete(`profile/delete-education/${id}`);

    dispatch(setAlert("Delete Education Successfully", "success"));
    return response.data;
  }
);

export const deleteExperience = createAsyncThunk(
  "/profile/delete-education",
  async (id, { dispatch }) => {
    const response = await api.delete(`profile/delete-experience/${id}`);

    dispatch(setAlert("Delete Experience Successfully", "success"));
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "/delete-profile",
  // eslint-disable-next-line no-empty-pattern
  async ({}, { dispatch }) => {
    const response = await api.delete("/profile");

    dispatch(logout());
    return response.data;
  }
);

const profileSlice = createSlice({
  initialState: initialState,
  name: "profile",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(deleteAccount.fulfilled, () => {
        return {
          initialState,
        };
      })
      .addMatcher(
        isAnyOf(
          getProfile.pending,
          addProfile.pending,
          addExperience.pending,
          addEducation.pending,
          deleteEducation.pending,
          deleteExperience.pending
        ),
        (state) => {
          console.log("Pending");
          return {
            ...state,
            isLoading: true,
          };
        }
      )
      .addMatcher(
        isAnyOf(
          getProfile.fulfilled,
          addProfile.fulfilled,
          addExperience.fulfilled,
          addEducation.fulfilled,
          deleteEducation.fulfilled,
          deleteExperience.fulfilled
        ),
        (state, action) => {
          return {
            ...state,
            isLoading: true,
            isSuccess: true,
            profile: action.payload.profile,
          };
        }
      )
      .addMatcher(
        isAnyOf(
          getProfile.rejected,
          addProfile.rejected,
          addExperience.rejected,
          addEducation.rejected,
          deleteEducation.rejected,
          deleteExperience.rejected
        ),
        (state) => {
          console.log("Rejected");
          return {
            ...state,
            isError: false,
            isLoading: false,
          };
        }
      );
  },
});

export default profileSlice.reducer;
