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
  const { email, contact } = req.body;
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

export const handleGetUsers = async (req, res) => {
  const users = await User.find({});
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, { users }, "Users details sent"));
};

export const handleUpdateLoginAccess = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid user id");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User details not found");
  }

  user.loginAccess = req.body.loginAccess;
  await user.save();

  const users = await User.find({}).select("-password");
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { users },
        `Login access for ${user.name} has been updated`
      )
    );
};

export const handleDeleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid user id");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User details not found");
  }

  const response = await User.findByIdAndDelete(userId);
  const users = await User.find({});

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { users },
        `user ${response.name} has been deleted`
      )
    );
};

export const handleUpdateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid user Id");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User details not found");
  }

  const response = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  const users = await User.find({});
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { users },
        `User ${response.name} details updated`
      )
    );
};
