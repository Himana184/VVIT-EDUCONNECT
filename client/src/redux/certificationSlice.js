import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addCertification = createAsyncThunk(
  "/api/v1/certification(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/certification", payload, {
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

export const getCertifications = createAsyncThunk(
  "/api/v1/certification(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/certification", {
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

export const deleteCertification = createAsyncThunk(
  "/api/v1/certification/:certificationId(delete)",
  async (payload, { rejectWithValue }) => {
    console.log("Delete certification payload : ", payload);
    try {
      const response = await axios.delete(
        `/api/v1/certification/${payload.data._id}`,
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

export const updateCertification = createAsyncThunk(
  "/api/v1/certification/:certificationId(patch)",
  async (payload, { rejectWithValue }) => {
    console.log("update user payload : ", payload);
    try {
      const response = await axios.patch(
        `/api/v1/certification/${payload.data._id}`,
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
const token = localStorage.getItem("token");

const certificationSlice = createSlice({
  name: "certification",
  initialState: {
    isLoading: false,
    certifications: [],
    token: token,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add user
    builder.addCase(addCertification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCertification.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.certifications = payload.data.certifications;
      toast.success(payload.message);
    });
    builder.addCase(addCertification.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Get users
    builder.addCase(getCertifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCertifications.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log("Payload : ", payload);
      state.certifications = payload.data.certifications.All;
      toast.success(payload.message);
    });
    builder.addCase(getCertifications.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Delete certification
    builder.addCase(deleteCertification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCertification.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.certifications = payload.data.certifications.all;
      toast.success(payload.message);
    });
    builder.addCase(deleteCertification.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Update user
    builder.addCase(updateCertification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCertification.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.certifications = payload.data.certifications;
      toast.success(payload.message);
    });
    builder.addCase(updateCertification.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
  },
});

export default certificationSlice.reducer;
