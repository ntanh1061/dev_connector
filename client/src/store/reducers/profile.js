import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

import api from "../../utils/api";

const initialState = {
  isLoading: true,
  profile: {},
};

export const addProfile = createAsyncThunk("/fuck", async (profile) => {
  const response = await api.post("/profile", profile);

  return response.data;
});

export const getProfile = createAsyncThunk("/profile/me", async () => {
  const response = await api.get("/profile/me");

  return response.data;
});

export const addExperience = createAsyncThunk(
  "/profile-add-experience",
  async (experience) => {
    const response = await api.put("/profile/add-experience", experience);

    return response.data;
  }
);

export const addEducation = createAsyncThunk(
  "/profile/add-education",
  async (education, history) => {
    const response = await api.put("/profile/add-education", education);

    history.push("/dashboard")
    return response.data;
  }
);

const profileSlice = createSlice({
  initialState: initialState,
  name: "profile",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getProfile.pending,
        addProfile.pending,
        addExperience.pending,
        addEducation.pending
      ),
      (state) => {
        return {
          ...state,
          isLoading: true,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        getProfile.fulfilled,
        addProfile.fulfilled,
        addExperience.fulfilled,
        addEducation.fulfilled
      ),
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          profile: action.payload.profile,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        getProfile.rejected,
        addProfile.rejected,
        addExperience.rejected,
        addEducation.rejected
      ),
      (state) => {
        return {
          ...state,
          isLoading: false,
        };
      }
    );
    // builder.addCase(getProfile.pending, (state) => {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // });
    // builder.addCase(getProfile.fulfilled, (state, action) => {
    //   console.log("aa", action.payload);
    //   return {
    //     ...state,
    //     isLoading: false,
    //     profile: action.payload.profile,
    //   };
    // });
    // builder.addCase(getProfile.rejected, (state) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // });
    // builder.addCase(addProfile.pending, (state) => {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // });
    // builder.addCase(addProfile.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     profile: action.payload.profile,
    //   };
    // });
    // builder.addCase(addProfile.rejected, (state) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // });
    // builder.addCase(addExperience.pending, (state) => {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // });
    // builder.addCase(addExperience.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     profile: action.payload.profile,
    //   };
    // });
    // builder.addCase(addExperience.rejected, (state) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // });
  },
});

export default profileSlice.reducer;
