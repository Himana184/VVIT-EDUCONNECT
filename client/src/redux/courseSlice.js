import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getCourses = createAsyncThunk(
  "/api/v1/course(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/course", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get courses response : ", response);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const addCourse = createAsyncThunk(
  "/api/v1/course(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/course", payload, {
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

export const updateCourse = createAsyncThunk(
  "/api/v1/course/:courseId(patch)",
  async (payload, { rejectWithValue }) => {
    console.log("update course payload : ", payload);
    try {
      const response = await axios.patch(
        `/api/v1/course/${payload.data._id}`,
        payload.data,
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
export const deleteCourse = createAsyncThunk(
  "/api/v1/course/:courseId(delete)",
  async (payload, { rejectWithValue }) => {
    console.log("Delete course payload : ", payload);
    try {
      const response = await axios.delete(
        `/api/v1/course/${payload.data._id}`,
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

const token = localStorage.getItem("token");

const courseSlice = createSlice({
  name: "course",
  initialState: {
    isLoading: false,
    courses: [],
    token: token,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add user

    // Get internship
    builder.addCase(getCourses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log("Payload : ", payload.data.courses.all);
      state.courses = payload.data.courses.all;
      toast.success(payload.message);
    });
    builder.addCase(getCourses.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Delete course
    builder.addCase(deleteCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.courses = payload.data.courses;
      toast.success(payload.message);
    });
    builder.addCase(deleteCourse.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    //add course
    builder.addCase(addCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.courses = payload.data.courses;
      toast.success(payload.message);
    });
    builder.addCase(addCourse.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    //update course
    builder.addCase(updateCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.courses = payload.data.courses;
      toast.success(payload.message);
    });
    builder.addCase(updateCourse.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });


  },
});

export default courseSlice.reducer;
