import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import "express-async-errors";
import multer from "multer";
import { errorHandler } from "./middleware/error.middlewares.js";
import studentRouter from "./routes/student.routes.js";
import authRouter from "./routes/auth.routes.js";
import internshipRouter from "./routes/internship.routes.js";
import certificationRouter from "./routes/certification.routes.js";
import courseRouter from "./routes/course.routes.js";
import announcementRouter from "./routes/announcement.routes.js";
import queryRouter from "./routes/query.routes.js";
import jobdriveRouter from "./routes/jobdrive.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors"
//configure the env variable from the root path of the server (filename: .env)
dotenv.config();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size is 20MB
  },
});
const app = express();
app.use(express.json());
app.use(cors())
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", upload.single("studentImage"), studentRouter);
app.use(
  "/api/v1/internship",
  upload.array("internshipFiles"),
  internshipRouter
);
app.use(
  "/api/v1/certification",
  upload.single("certificationFile"),
  certificationRouter
);
app.use("/api/v1/course", upload.single("courseFile"), courseRouter);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/query", queryRouter);
app.use("/api/v1/jobdrive", upload.array("jobFiles"), jobdriveRouter);
app.use("/api/v1/user",upload.single('userImage'),userRouter);

//custom error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//connect to DB and start server
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
