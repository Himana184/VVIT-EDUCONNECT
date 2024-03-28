import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getStudents = createAsyncThunk(
  "/api/v1/student/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/student/all", {
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

export const getStudentDetails = createAsyncThunk(
  "/api/v1/student/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/student/${payload.id}`, {
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
export const deleteStudent = createAsyncThunk(
  "/api/v1/student/:id(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/student/${payload.data._id}`,
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
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    student: {},
    students: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.data.students;
      toast.success(payload.message);
    });
    builder.addCase(getStudents.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "something went wrong");
    });

    builder.addCase(getStudentDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudentDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.student = payload.data.student;
      toast.success(payload.message);
    });
    builder.addCase(getStudentDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "something went wrong");
    });
    // Delete student
    builder.addCase(deleteStudent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteStudent.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.data.students;
      toast.success(payload.message);
    });
    builder.addCase(deleteStudent.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
