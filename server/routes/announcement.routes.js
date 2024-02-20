import express from "express";
import {
    handleAddAnnouncement,
    getAllAnnouncements,
    handleDeleteAnnouncement,
  } from '../controllers/announcement.controller.js';
const router = express.Router();
// actions can be performed by  admin, coordinator
router
  .route("/")
  .get(getAllAnnouncements)
  .post(handleAddAnnouncement)
  .delete(handleDeleteAnnouncement);
export default router;
