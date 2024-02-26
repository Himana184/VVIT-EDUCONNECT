import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Bearer token missing");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Token is missing");
  }
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(StatusCodes.FORBIDDEN, "Login again !");
  }
};
