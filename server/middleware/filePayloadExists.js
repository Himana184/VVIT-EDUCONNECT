import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export const filesPayloadExists = (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required file");
  }
  next();
};
