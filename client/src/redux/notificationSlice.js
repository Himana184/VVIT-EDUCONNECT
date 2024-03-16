/* eslint-disable no-unused-vars */
import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const handleSaveUserToken = createAsyncThunk(
  "/api/v1/notification/saveToken",
  async (payload, { rejectWithValue }) => {
    console.log(payload)
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
      console.log(response);
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
const user = JSON.parse(localStorage.getItem("user"));
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
      toast.success(payload.message || "Token saved to DB");
    });
    builder.addCase(handleSaveUserToken.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      console.log(payload?.message || "Something went wrong");
    });
  },
});

export default notificationSlice.reducer;
