import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import userReducer from "./redux/userSlice";
import studentReducer from "./redux/studentSlice";
import jobReducer from "./redux/jobSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    job: jobReducer,
  },
});

export default store;
