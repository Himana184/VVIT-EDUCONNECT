import express from "express";
import {
  getAllInternships,
  getStudentInternships,
  handleAddInternship,
  handleCompletionCertificateUpload,
  handleDeleteInternship,
  handleInternshipVerification,
  handleUpdateInternship,
} from "../controllers/internship.controller.js";
import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";
import multer from "multer";
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size is 20MB
  },
});
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
router.route("/verify/:internshipId").patch(handleInternshipVerification);

// router.use(filesPayloadExists);
// router.use(
//   fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
// );
// router.use(fileSizeLimiter);

router
  .route("/")
  .post(
    upload.single("offerLetter"),
    filesPayloadExists,
    fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"]),
    fileSizeLimiter,
    handleAddInternship
  );
router
  .route("/upload/certificate")
  .patch(
    upload.single("completionCertificate"),
    filesPayloadExists,
    fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"]),
    fileSizeLimiter,
    handleCompletionCertificateUpload
  );
export default router;
