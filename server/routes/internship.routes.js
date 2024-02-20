import express from "express";
import {
  getAllInternships,
  getStudentInternships,
  handleAddInternship,
  handleDeleteInternship,
  handleInternshipVerification,
  handleUpdateInternship,
} from "../controllers/internship.controller.js";

const router = express.Router();

// actions can be performed by student, admin, coordinator
router
  .route("/")
  .get(getAllInternships)
  .post(handleAddInternship)
  .patch(handleUpdateInternship)
  .delete(handleDeleteInternship);

//used when admin or coordinator is viewing individual student data
router.route("/student/:studentId").get(getStudentInternships);

//to be done by admin or coordinator
router.route("/verify").patch(handleInternshipVerification);

export default router;
