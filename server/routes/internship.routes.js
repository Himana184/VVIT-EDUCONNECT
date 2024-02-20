import express from "express";
import {
    handleAddInternship,
    handleUpdateInternship,
    handleInternshipVerification,
    getStudentInternships,
    getAllInternships,
    handleDeleteInternship,
    getInternshipsByRole,
} from "../controllers/internship.controller.js";
const router = express.Router();

router.route("/addinternship").post(handleAddInternship);
router.route("/updateinternship").patch(handleUpdateInternship);
router.route("/allinterns").get(getAllInternships);
router.route("/internsbyrole").get(getInternshipsByRole);
router
  .route("/:studentId")
  .get(getInternshipsByRole)
  .patch(handleInternshipVerification)
  .delete(handleDeleteInternship);

export default router;
