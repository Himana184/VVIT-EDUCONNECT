import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const studentLogin = createAsyncThunk(
  "/api/v1/auth/student/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/student/login", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/api/v1/auth/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/user/login", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const studentRegisteration = createAsyncThunk(
  "/api/v1/auth/student/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/student/register",
        payload
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const token = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {},
    token: token,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(studentLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(studentLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.data.student;
      localStorage.setItem("token", payload.data.accessToken);
      toast.success(payload.message);
    });
    builder.addCase(studentLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Something went wrong");
    });

    // User login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      state.user = payload.data.user;
      localStorage.setItem("token", payload.data.accessToken);
      toast.success(payload.message);
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Something went wrong");
    });

    //student registeration
    builder.addCase(studentRegisteration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(studentRegisteration.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload.message);
    });
    builder.addCase(studentRegisteration.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Something went wrong");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
