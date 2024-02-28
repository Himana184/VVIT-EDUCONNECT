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
const router = express.Router();
// actions can be performed by  admin, coordinator
router
  .route("/")
  .get(getAllAnnouncements);
router.route("/:userId").patch(handleUpdateAnnouncement).delete(handleDeleteAnnouncement);
router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);
router.route("/").post(handleAddAnnouncement);
export default router;
