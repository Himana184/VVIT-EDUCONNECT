import express from "express";
import { handleSaveUserDeviceToken } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/saveToken", handleSaveUserDeviceToken);

export default router;
