import express from "express";
import {
    handleAddAnnouncement,
    getAllAnnouncements,
    handleDeleteAnnouncement,
    handleUpdateAnnouncement,
  } from '../controllers/announcement.controller.js';
import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";

const router = express.Router();
// actions can be performed by  admin, coordinator
router
  .route("/")
  .get(getAllAnnouncements);
router.use(isAuthenticated);
router
  .route("/:announcementId")
  .patch(handleUpdateAnnouncement)
  .delete(handleDeleteAnnouncement);
router.route("/").post(handleAddAnnouncement);
export default router;
