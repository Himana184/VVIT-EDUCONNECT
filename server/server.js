import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./middleware/error.middlewares.js";
import Internship from "./models/internship.model.js"
import studentRouter from "./routes/student.routes.js";

//configure the env variable from the root path of the server (filename: .env)
dotenv.config();

const app = express();
app.use(express.json());

//routes
app.use("/api/v1/student", studentRouter);

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
