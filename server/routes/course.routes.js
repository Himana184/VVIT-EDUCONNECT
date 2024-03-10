import express from "express";

import {
  getAllCourses,
  getStudentCourses,
  handleAddCourse,
  handleDeleteCourse,
  handleUpdateCourse,
} from "../controllers/course.controller.js";

import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";
const router = express.Router();
router.use(isAuthenticated);
router.route("/").get(getAllCourses);
router.route("/courseId").patch(handleUpdateCourse).delete(handleDeleteCourse);

router.route("/student/:studentId").get(getStudentCourses);

router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);
router.route("/").post(handleAddCourse);
export default router;
