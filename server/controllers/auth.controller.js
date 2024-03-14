import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";
import { cookieOptions } from "./constants.js";
import Student from "../models/student.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { logActivity } from "../utils/logActivity.js";
import { logcategories } from "../utils/logcategories.js";

export const handleStudentLogin = async (req, res) => {
  //check whether student email and password are received
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
  }

  //check whether the student exists in database with the given email which can be either college or personal mail
  var student = await Student.findOne({
    $or: [{ collegeMail: email }, { personalMail: email }],
  })
    .select("+password")
    .exec();

  //if student details are not found with the given email
  if (!student) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student details not found");
  }

  //compare the password received and password stored in the database
  const passwordMatch = await student.isPasswordCorrect(password);
  if (!passwordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid login details");
  }

  //generate a access token where the data contains the student id, rollnumber and role
  const accessToken = await student.generateAccessToken();

  //after the login is successful an email must be sent to the user
  //this will be done by kafka service

  //Log the activity
  logActivity(
    req,
    res,
    logcategories["auth"],
    `Student with email ${email} has logged in`
  );
  //return success response
  return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { student, accessToken },
        "student login successful"
      )
    );
};

export const handleUserLogin = async (req, res) => {
  //check whether email and password are received
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("email and password are required", StatusCodes.BAD_REQUEST);
  }

  //check whether the user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found", StatusCodes.UNAUTHORIZED);
  }

  //compare the password received and the password stored in db
  const passwordMatch = await user.isPasswordCorrect(password);
  if (!passwordMatch) {
    throw new Error("invalid login details", StatusCodes.UNAUTHORIZED);
  }

  //generate access token with userId and role
  const accessToken = await user.generateAccessToken();

  //delete the password field in the user object
  delete user.password;

  logActivity(
    req,
    res,
    logcategories["auth"],
    `User with email ${email} has logged in`
  );
  return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { user, accessToken },
        "User login successful"
      )
    );
};

export const studentPasswordUpdate = async (req, res) => {
  //check whether old password and new password are received or not
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error(
      "old password and new password are required",
      StatusCodes.BAD_REQUEST
    );
  }

  //check whether a student exists with the given id
  const studentId = req.userId;
  if (!mongoose.isValidObjectId(studentId)) {
    throw new Error("not a valid student id", StatusCodes.BAD_REQUEST);
  }

  //find the student and compare the old password with the password in the database
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("student not found", StatusCodes.NOT_FOUND);
  }

  // check the old password
  const passwordValid = await student.isPasswordCorrect(oldPassword);
  if (!passwordValid) {
    throw new Error("invalid password", StatusCodes.BAD_REQUEST);
  }

  // assign new password in plain text
  // We have a pre save method attached to user schema which automatically hashes the password whenever added/modified
  student.password = newPassword;
  await student.save({ validateBeforeSave: false });

  logActivity(
    req,
    res,
    logcategories["auth"],
    `Student with email ${student.email} has updated the password`
  );

  return res.status(200).json({ message: "password changed successfully" });
};

export const userPasswordUpdate = async (req, res) => {
  //check whether old password and new password are received or not
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error(
      "old password and new password are required",
      StatusCodes.BAD_REQUEST
    );
  }

  //check whether a user exists with the given id
  const userId = req.userId;
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("not a valid user id", StatusCodes.BAD_REQUEST);
  }

  //find the user and compare the old password with the password in the database
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("user not found", StatusCodes.NOT_FOUND);
  }

  // check the old password
  const passwordValid = await user.isPasswordCorrect(oldPassword);
  if (!passwordValid) {
    throw new Error("invalid password", StatusCodes.BAD_REQUEST);
  }

  // assign new password in plain text
  // We have a pre save method attached to user schema which automatically hashes the password whenever added/modified
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  logActivity(
    req,
    res,
    logcategories["auth"],
    `Student with email ${user.email} has updated the password`
  );
  return res.status(200).json({ message: "password changed successfully" });
};
