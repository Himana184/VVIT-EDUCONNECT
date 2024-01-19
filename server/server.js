import express from "express";
import { ErrorMiddleWare } from "./middleware/error.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv"

//configure the env variable from the root path of the server (filename: .env)
dotenv.config();

const app = express();


//custom error middleware
app.use(ErrorMiddleWare);

const PORT = process.env.PORT || 5000

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