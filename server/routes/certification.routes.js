import express from "express";

import {
  getAllCertifications,
  getStudentCertifications,
  handleAddCertification,
  handleDeleteCertification,
  handleUpdateCertification,
} from "../controllers/certification.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCertifications)
  .post(handleAddCertification)
  .patch(handleUpdateCertification)
  .delete(handleDeleteCertification);

//admin and coordinator will have access to this
router.route("/student/:studentId").get(getStudentCertifications);

export default router;
