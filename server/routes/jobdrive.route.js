import express from 'express';
import {
  handleAddJobDrive,
  getAllJobDrives,
  handleDeleteJobDrive,
} from '../controllers/jobdrive.controller.js';


const router = express.Router();

router
 .route("/")
 .get(getAllJobDrives)
 .post(handleAddJobDrive)
 .delete(handleDeleteJobDrive);

export default router;