import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const fileSizeLimiter = (req, res, next) => {
  const files = [req.file];
  const filesOverLimit = [];
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].originalname);
    }
  });

  if (filesOverLimit.length > 0) {
    const properVerb = filesOverLimit.length > 1 ? "are" : "is";
    const sentence =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(
        ",",
        ", "
      );
    const message =
      filesOverLimit.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

    throw new ApiError(StatusCodes.REQUEST_TOO_LONG, message);
  }
  next();
};
