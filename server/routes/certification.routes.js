import express from "express";
import { isAuthenticated } from "../middleware/verifyJWT.js";
import {
  getAllCertifications,
  getStudentCertifications,
  handleAddCertification,
  handleDeleteCertification,
  handleUpdateCertification,
} from "../controllers/certification.controller.js";
import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
const router = express.Router();
router.use(isAuthenticated);
router.route("/").get(getAllCertifications);
router
  .route("/:certificationId")
  .patch(handleUpdateCertification)
  .delete(handleDeleteCertification);

//admin and coordinator will have access to this
router.route("/student/:studentId").get(getStudentCertifications);

router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);

router.route("/").post(handleAddCertification);
export default router;
