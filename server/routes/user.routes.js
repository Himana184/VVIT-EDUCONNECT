import express from "express";
import {
  handleAddUser,
  handleDeleteUser,
  handleGetUsers,
  handleUpdateLoginAccess,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import { filesPayloadExists } from "../middleware/filePayloadExists.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";

const router = express.Router();

router.route("/").get(handleGetUsers);
router.route("/:userId").patch(handleUpdateUser).delete(handleDeleteUser);
router.route("/loginaccess/:userId").patch(handleUpdateLoginAccess);

router.use(filesPayloadExists);
router.use(
  fileExtLimiter([".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg", ".pdf"])
);
router.use(fileSizeLimiter);
router.route("/").post(handleAddUser);

export default router;
