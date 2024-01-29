import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getStudentDetails,
  handleStudentRegisteration,
  updateStudentDetails,
} from "../controllers/student.controller.js";

const router = express.Router();

router.route("/register").post(handleStudentRegisteration);
router.route("/all").get(getAllStudents);
router
  .route("/:studentId")
  .get(getStudentDetails)
  .patch(updateStudentDetails)
  .delete(deleteStudent);

export default router;
