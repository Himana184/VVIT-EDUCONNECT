import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
  },
  reducers: {
    logout: () => {
      console.log("Hello");
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
