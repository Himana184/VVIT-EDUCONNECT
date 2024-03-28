import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addInternship = createAsyncThunk(
  "/api/v1/internship(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/internship", payload, {
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

export const getInternships = createAsyncThunk(
  "/api/v1/internship(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/internship", {
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

export const deleteInternship = createAsyncThunk(
  "/api/v1/internship/:internshipId(delete)",
  async (payload, { rejectWithValue }) => {
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
export const updateInternship = createAsyncThunk(
  "/api/v1/internship/:internshipId(patch)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/internship/${payload._id}`,
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

export const handleInternshipVerification = createAsyncThunk(
  "/api/v1/internship/verify/:internshipId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/internship/verify/${payload.id}`,
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

export const uploadCompletionCertificate = createAsyncThunk(
  "/api/v1/internship/upload/certificate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/internship/upload/certificate`,
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

const token = localStorage.getItem("token");
const internshipSlice = createSlice({
  name: "internship",
  initialState: {
    isLoading: false,
    allInternships: [],
    internships: [],
    token: token,
  },
  reducers: {
    handleFilter: (state, { payload }) => {
      state.internships = state.allInternships[payload.status];
    },
  },
  extraReducers: (builder) => {
    //add internship
    builder.addCase(addInternship.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInternship.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.internships = payload.data.internships.All;
      state.allInternships = payload.data.internships.All;
      toast.success(payload.message);
    });
    builder.addCase(addInternship.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Get internship
    builder.addCase(getInternships.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInternships.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allInternships = payload.data.internships;
      state.internships = payload.data.internships.All || [];
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
      state.allInternships = payload.data.internships;
      state.internships = payload.data.internships.All;
      toast.success(payload.message);
    });
    builder.addCase(deleteInternship.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
    //update internship
    builder.addCase(updateInternship.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInternship.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allInternships = payload.data.internships;
      state.internships = payload.data.internships.All || [];
      toast.success(payload.message);
    });
    builder.addCase(updateInternship.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "something went wrong");
    });

    builder.addCase(handleInternshipVerification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      handleInternshipVerification.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.allInternships = payload.data.internships.All;
        state.internships = payload.data.internships.All;
        toast.success(payload.message);
      }
    );
    builder.addCase(
      handleInternshipVerification.rejected,
      (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message || "something went wrong");
      }
    );

    builder.addCase(uploadCompletionCertificate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      uploadCompletionCertificate.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.allInternships = payload.data.internships.All;
        state.internships = payload.data.internships.All;
        toast.success(payload.message);
      }
    );
    builder.addCase(
      uploadCompletionCertificate.rejected,
      (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message || "something went wrong");
      }
    );
  },
});

export default internshipSlice.reducer;
export const { handleFilter } = internshipSlice.actions;
