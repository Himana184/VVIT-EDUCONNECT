import express from "express";
import { isAuthenticated } from "../middleware/verifyJWT.js";
import { getInternshipsCountByPassouYear } from "../controllers/stats.controller.js";

const router = express.Router();
router.use(isAuthenticated);
router.route("/internshipStats").get(getInternshipsCountByPassouYear);
export default router;
