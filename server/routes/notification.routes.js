import express from "express";
import { handleSaveUserDeviceToken, sendNotificationsToTokens } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/saveToken", handleSaveUserDeviceToken);
router.post("/sendNotification",sendNotificationsToTokens)
export default router;
