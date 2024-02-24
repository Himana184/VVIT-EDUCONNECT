import { StatusCodes } from "http-status-codes";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { userRequiredFields } from "./constants.js";
import { studentRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import uploadSingleFile from "../utils/uploadToCloud.js";

// handle add user

export const handleAddUser = async (req, res) => {
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    userRequiredFields
  );

  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  const user = await User.findOne({ $or: [{ email }, { contact }] });

  if (user) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "user with given details already exists"
    );
  }
  const fileType = req.file.originalname.split(".")[1];
  const uploadResponse = await uploadSingleFile(
    req.file,
    "user-images",
    req.body.name.replace(/\s+/g, "") + "." + fileType
  );
  if (!uploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload student photo"
    );
  }
  //set the image value to the response url from the upload.
  req.body.image = uploadResponse.url;

  const newUser = await User.create(req.body);
  const users = await User.find({});

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { users },
        `User ${req.body.name} added`
      )
    );
};



