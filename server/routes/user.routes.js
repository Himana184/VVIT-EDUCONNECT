import express from "express"
import { handleAddUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(handleAddUser);

export default router;