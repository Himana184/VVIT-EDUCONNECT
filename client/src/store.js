import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import userReducer from "./redux/userSlice";
import studentReducer from "./redux/studentSlice";
import jobReducer from "./redux/jobSlice";
import certificationReducer from "./redux/certificationSlice";
import internshipReducer from "./redux/internshipSlice";
import courseReducer from "./redux/courseSlice";
import announcementReducer from "./redux/announcementSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    job: jobReducer,
    certification: certificationReducer,
    internship: internshipReducer,
    course: courseReducer,
    announcement: announcementReducer,
  },
});

export default store;
