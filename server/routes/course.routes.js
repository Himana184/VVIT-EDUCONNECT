import express from "express";
import express from 'express';
import {
  getAllCourses,
  getStudentCourses,
  handleAddCourse,
  handleDeleteCourse,
  handleUpdateCourse,
} from '../controllers/courses.controller.js';
const router = express.Router();
router.route("/")
    .get(getAllCourses)
    .post(handleAddCourse)
    .patch(handleUpdateCourse)
    .delete(handleDeleteCourse);

router.route("/student/:studentId").get(getStudentCourses);
export default router;
