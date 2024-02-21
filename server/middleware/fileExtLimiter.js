import path from "path";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

export const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = [req.file];
    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].originalname));
    });
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, message);
    }
    next();
  };
};
