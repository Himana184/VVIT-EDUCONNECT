import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



export const getInternships = createAsyncThunk(
  "/api/v1/internship(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/internship", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get certifications response : ", response);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteInternship = createAsyncThunk(
  "/api/v1/internship/:internshipId(delete)",
  async (payload, { rejectWithValue }) => {
    console.log("Delete certification payload : ", payload);
    try {
      const response = await axios.delete(
        `/api/v1/internship/${payload.data._id}`,
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

const token = localStorage.getItem("token")
const internshipSlice = createSlice({
  name: "internship",
  initialState: {
    isLoading: false,
    internships: [],
    token: token,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add user


    // Get internship
    builder.addCase(getInternships.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInternships.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log("Payload : ", payload.data.internships.all);
      state.internships = payload.data.internships.all;
      toast.success(payload.message);
    });
    builder.addCase(getInternships.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Delete user
    builder.addCase(deleteInternship.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInternship.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.internships = payload.data.internships;
      toast.success(payload.message);
    });
    builder.addCase(deleteInternship.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });


  },
});

export default internshipSlice.reducer;
