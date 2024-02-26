import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const handleAddJobDrive = createAsyncThunk(
  "/api/v1/job",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/jobdrive", payload, {
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
const jobSlice = createSlice({
  name: "job",
  initialState: {
    isLoading: false,
    jobs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleAddJobDrive.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(handleAddJobDrive.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.data.jobs;
      console.log(payload);
      toast.success(payload.message);
    });

    builder.addCase(handleAddJobDrive.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      toast.error(payload?.message || "Something went wrong");
    });
  },
});

export default jobSlice.reducer;
