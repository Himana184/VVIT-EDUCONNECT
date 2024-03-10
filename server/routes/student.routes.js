import express from "express";
import {
  deleteStudent,
  getAllStudents,
  handleGetStudentDetails,
  handleStudentRegisteration,
  updateStudentDetails,
} from "../controllers/student.controller.js";

import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";

const router = express.Router();

router.route("/register").post(handleStudentRegisteration);
router.use(isAuthenticated)
router.route("/all").get(getAllStudents);
router
  .route("/:studentId")
  .get(handleGetStudentDetails)
  .patch(updateStudentDetails)
  .delete(deleteStudent);

router.use(isAuthenticated);

//check for the file middleware
router.use(filesPayloadExists);
router.use(fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg"]));
router.use(fileSizeLimiter);

export default router;
