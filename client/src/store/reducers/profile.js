import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  createAction,
} from "@reduxjs/toolkit";

import api from "../../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert-reducer";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  profile: {},
  profiles: [],
  count: 0,
};

export const addProfile = createAsyncThunk(
  "/profile",
  async ({ profile, history, isEdit }, { dispatch }) => {
    const response = await api.post("/profile", profile);

    dispatch(
      setAlert(
        `${isEdit ? "Update" : "Create"} Profile Successfully`,
        "success"
      )
    );

    history.push("/dashboard");
    return response.data;
  }
);

export const getAllProfiles = createAsyncThunk(
  "/get-all-profile",
  async (criteria) => {
    const { page } = criteria;
    const response = await api.get("/profile", {
      params: { page },
    });

    return response.data;
  }
);

export const getProfile = createAsyncThunk("/profile/me", async () => {
  const response = await api.get("/profile/me");

  return response.data;
});

export const getProfileById = createAsyncThunk(
  "profile/user/:userId",
  async (userId) => {
    const response = await api.get(`/profile/user/${userId}`);

    return response.data;
  }
);

export const addExperience = createAsyncThunk(
  "/profile-add-experience",
  async ({ experience, history }, { dispatch }) => {
    const response = await api.put("/profile/add-experience", experience);

    dispatch(setAlert("Add Experience Successfully", "success"));
    history.push("/dashboard");
    return response.data;
  }
);

export const addEducation = createAsyncThunk(
  "/profile/add-education",
  async ({ education, history }, { dispatch }) => {
    const response = await api.put("/profile/add-education", education);

    dispatch(setAlert("Add Education Successfully", "success"));
    history.push("/dashboard");
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
  async (id, { dispatch }) => {
    const response = await api.delete("/profile");

    dispatch(logout());
    return response.data;
  }
);

export const setCriteria = createAction("SET_CRITERIA");

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
      .addCase(getAllProfiles.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        const { profiles, count } = action.payload;

        console.log(action.payload);
        return {
          ...state,
          isLoading: false,
          profiles,
          count,
        };
      })
      .addMatcher(
        isAnyOf(
          getProfile.pending,
          addProfile.pending,
          addExperience.pending,
          addEducation.pending,
          deleteEducation.pending,
          deleteExperience.pending,
          getProfileById.pending
        ),
        (state) => {
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
          deleteExperience.fulfilled,
          getProfileById.fulfilled
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
          deleteExperience.rejected,
          getProfileById.rejected
        ),
        (state) => {
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
