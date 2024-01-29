import express from "express";
import {
  handleStudentLogin,
  handleUserLogin,
  studentPasswordUpdate,
  userPasswordUpdate,
} from "../controllers/auth.controller.js";

const router = express.Router();

//auth routes related to student
router.route("/student/login").post(handleStudentLogin);
router.route("/student/updatepassword").post(studentPasswordUpdate);
router.route("/student/forgotPassword").post();

//auth routes related to user
router.route("/user/login").post(handleUserLogin);
router.route("/user/updatePassword").post(userPasswordUpdate);
router.route("/user/forgotPassword").post();

export default router;