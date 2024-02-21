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
import { fileExtLimiter } from "../middleware/fileSizeLimiter.js";

const router = express.Router();
router
  .route("/")
  .get(getAllCourses)
  .patch(handleUpdateCourse)
  .delete(handleDeleteCourse);

router.route("/student/:studentId").get(getStudentCourses);

router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);
router.route("/").post(handleAddCourse);
export default router;
