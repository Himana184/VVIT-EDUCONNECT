import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const handleAddJobDrive = createAsyncThunk(
  "/api/v1/jobdrive(post)",
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
export const getJobDrives = createAsyncThunk(
  "/api/v1/jobdrive(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/jobdrive", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get jobdrive response : ", response);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getJobDriveDetails = createAsyncThunk(
  "/api/v1/jobdrive/:jobId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/jobDrive/${payload.id}`, {
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

export const deleteJobDrive = createAsyncThunk(
  "/api/v1/jobdrive/:jobId(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/jobDrive/${payload.id}`, {
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

export const handleOptInDrive = createAsyncThunk(
  "/api/v1/jobdrive/optIn/:jobId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/jobDrive/optIn/${payload.id}`,
        {},
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

export const handleOptOutDrive = createAsyncThunk(
  "/api/v1/jobdrive/optOut/:jobId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/jobDrive/optOut/${payload.id}`,
        {},
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
const jobSlice = createSlice({
  name: "job",
  initialState: {
    isLoading: false,
    jobs: [],
    job: {},
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

    //get jobdrives
    builder.addCase(getJobDrives.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobDrives.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.data.jobDrives;
      toast.success(payload.message);
    });
    builder.addCase(getJobDrives.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    //get jobdrive
    builder.addCase(getJobDriveDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobDriveDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.job = payload.data.job;
      toast.success(payload.message);
    });
    builder.addCase(getJobDriveDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    builder.addCase(deleteJobDrive.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJobDrive.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.data.jobDrives;
      toast.success(payload.message);
    });
    builder.addCase(deleteJobDrive.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    builder.addCase(handleOptInDrive.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleOptInDrive.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.job = payload.data.job;
      toast.success(payload.message);
    });
    builder.addCase(handleOptInDrive.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    builder.addCase(handleOptOutDrive.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleOptOutDrive.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.job = payload.data.job;
      toast.success(payload.message);
    });
    builder.addCase(handleOptOutDrive.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
  },
});

export default jobSlice.reducer;
