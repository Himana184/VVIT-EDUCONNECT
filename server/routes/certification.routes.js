import express from "express";
import express from 'express';
import {
  getAllCertifications,
  getStudentCertifications,
  handleAddCertification,
  handleDeleteCertification,
  handleUpdateCertification,
} from '../controllers/certification.controller.js';

const router = express.Router();

router.route("/")
    .get(getAllCertifications)
    .post(handleAddCertification)
    .patch(handleUpdateCertification)
    .delete(handleDeleteCertification);

router.route("/student/:studentId").get(getStudentCertifications);

export default router;
