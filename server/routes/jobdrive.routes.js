import express from 'express';
import {
  handleAddJobDrive,
  getAllJobDrives,
  handleDeleteJobDrive,
  getJobDriveDetails,
} from '../controllers/jobdrive.controller.js';


const router = express.Router();

router
 .route("/")
 .get(getAllJobDrives)
 .post(handleAddJobDrive)

router.route("/:jobId").get(getJobDriveDetails).delete(handleDeleteJobDrive);
export default router;