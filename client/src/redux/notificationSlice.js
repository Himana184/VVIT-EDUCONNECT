/* eslint-disable no-unused-vars */
import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const handleSaveUserToken = createAsyncThunk(
  "/api/v1/notification/saveToken",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/v1/notification/saveToken`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
export const sendNotificationToStudents = createAsyncThunk(
  "/api/v1/notification/sendNotification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/notification/sendNotification",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload.role;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleSaveUserToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSaveUserToken.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(payload.student));
      toast.success(payload.message || "Token saved to DB");
    });
    builder.addCase(handleSaveUserToken.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(sendNotificationToStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      sendNotificationToStudents.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message || "Notifications sent!");
      }
    );
    builder.addCase(
      sendNotificationToStudents.rejected,
      (state, { payload }) => {
        state.isLoading = false;
      }
    );
  },
});

export default notificationSlice.reducer;
