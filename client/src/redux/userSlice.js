import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addUser = createAsyncThunk(
  "/api/v1/user(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user", payload, {
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

export const getUsers = createAsyncThunk(
  "/api/v1/user(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get users response : ", response);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/api/v1/user/:userId(delete)",
  async (payload, { rejectWithValue }) => {
    console.log("Delete user payload : ", payload);
    try {
      const response = await axios.delete(`/api/v1/user/${payload.data._id}`, {
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

export const updateUser = createAsyncThunk(
  "/api/v1/user/:userId(patch)",
  async (payload, { rejectWithValue }) => {
    console.log("update user payload : ", payload);
    try {
      const response = await axios.patch(
        `/api/v1/user/${payload.data._id}`,
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    token: token,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.data.users;
      toast.success(payload.message);
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Get users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.data.users;
      toast.success(payload.message);
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.data.users;
      toast.success(payload.message);
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.data.users;
      toast.success(payload.message);
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
  },
});

export default userSlice.reducer;
