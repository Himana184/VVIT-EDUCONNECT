import express from "express";
import {
  handleAddJobDrive,
  getAllJobDrives,
  handleDeleteJobDrive,
  getJobDriveDetails,
  handleStudentOptIn,
  handleStudentOptOut,
} from "../controllers/jobdrive.controller.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";

const router = express.Router();
router.use(isAuthenticated);
router.route("/").get(getAllJobDrives).post(handleAddJobDrive);

router.route("/:jobId").get(getJobDriveDetails).delete(handleDeleteJobDrive);
router.route("/optIn/:jobId").patch(handleStudentOptIn);
router.route("/optOut/:jobId").patch(handleStudentOptOut);
export default router;
