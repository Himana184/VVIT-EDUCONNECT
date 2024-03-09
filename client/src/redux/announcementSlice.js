import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addAnnouncement = createAsyncThunk(
  "/api/v1/announcement(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/announcement", payload, {
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

export const getAnnouncements = createAsyncThunk(
  "/api/v1/announcement(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/announcement", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get announcement response : ", response);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "/api/v1/announcement/:announcementId(delete)",
  async (payload, { rejectWithValue }) => {
    console.log("Delete announcement payload : ", payload);
    try {
      const response = await axios.delete(
        `/api/v1/announcement/${payload._id}`,
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

export const updateAnnouncement = createAsyncThunk(
  "/api/v1/announcement/:announcementId(patch)",
  async (payload, { rejectWithValue }) => {
    console.log("update announcement payload : ", payload);
    try {
      const response = await axios.patch(
        `/api/v1/announcement/${payload._id}`,
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

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    currentPriority: "all",
    allAnnouncements: [],
    isLoading: false,
    announcements: [],
    announcement: {},
  },
  reducers: {
    setAnnouncement: (state, { payload }) => {
      state.announcement = payload.announcement;
    },
    filterByPriority: (state, { payload }) => {
      state.currentPriority = payload.currentPriority;
      if (payload.priority == "all") {
        state.announcements = state.allAnnouncements;
      } else {
        state.announcements = state.allAnnouncements.filter(
          (announcement) => announcement.priority == payload.priority
        );
      }
      console.log(state.allAnnouncements);
    },
  },
  extraReducers: (builder) => {
    // Add announcement
    builder.addCase(addAnnouncement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAnnouncement.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allAnnouncements = payload.data.announcements;
      state.announcements = payload.data.announcements;
      toast.success(payload.message);
    });
    builder.addCase(addAnnouncement.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Get announcement
    builder.addCase(getAnnouncements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAnnouncements.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allAnnouncements = payload.data.announcements;
      state.announcements = payload.data.announcements;
      toast.success(payload.message);
    });
    builder.addCase(getAnnouncements.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Delete announcement
    builder.addCase(deleteAnnouncement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAnnouncement.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allAnnouncements = payload.data.announcements;
      state.announcements = state.allAnnouncements.filter((announcement)=>announcement.priority == state.currentPriority)
      toast.success(payload.message);
    });
    builder.addCase(deleteAnnouncement.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });

    // Update announcement
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAnnouncement.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allAnnouncements = payload.data.announcements;
      toast.success(payload.message);
    });
    builder.addCase(updateAnnouncement.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message || "something went wrong");
    });
  },
});

export const { setAnnouncement, filterByPriority } = announcementSlice.actions;
export default announcementSlice.reducer;
