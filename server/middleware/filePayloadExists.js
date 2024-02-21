import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export const filesPayloadExists = (req, res, next) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing file");
  }
  next();
};
