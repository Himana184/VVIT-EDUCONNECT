import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
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
      const response = await axios.post("/api/v1/student/register", payload);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const studentEmailVerification = createAsyncThunk(
  "/api/v1/student/verify/:jwt",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/student/verify/${payload.token}`
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
const user = JSON.parse(localStorage.getItem("user"));
const role = localStorage.getItem("role");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: user,
    role: role,
    token: token,
  },
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload.role;
    },
    clearAuthState: (state) => {
      (state.user = {}), (state.role = ""), (state.token = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(studentLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(studentLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.data.student;
      const decodedData = jwtDecode(payload.data.accessToken);
      state.role = decodedData.user.role;
      state.token = payload.data.accessToken;
      localStorage.setItem("user", JSON.stringify(payload.data.student));
      localStorage.setItem("token", payload.data.accessToken);
      localStorage.setItem("role", decodedData.user.role);
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
      state.user = payload.data.user;
      const decodedData = jwtDecode(payload.data.accessToken);
      state.role = decodedData.user.role;
      state.token = payload.data.accessToken;
      localStorage.setItem("user", JSON.stringify(payload.data.user));
      localStorage.setItem("token", payload.data.accessToken);
      localStorage.setItem("role", decodedData.user.role);
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

    builder.addCase(studentEmailVerification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      studentEmailVerification.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
      }
    );
    builder.addCase(studentEmailVerification.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Something went wrong");
    });
  },
});

export const { logout, setRole, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
