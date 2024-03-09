import express from "express";
import {
  getAllInternships,
  getStudentInternships,
  handleAddInternship,
  handleDeleteInternship,
  handleInternshipVerification,
  handleUpdateInternship,
} from "../controllers/internship.controller.js";
import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(isAuthenticated);
// actions can be performed by student, admin, coordinator
router.route("/").get(getAllInternships);

router
  .route("/:internshipId")
  .patch(handleUpdateInternship)
  .delete(handleDeleteInternship);

//used when admin or coordinator is viewing individual student data
router.route("/student/:studentId").get(getStudentInternships);

//to be done by admin or coordinator
router.route("/verify").patch(handleInternshipVerification);

router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);

router.route("/").post(handleAddInternship);
export default router;
