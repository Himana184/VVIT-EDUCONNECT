import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Student from "../models/student.model.js";

export const handleSaveUserDeviceToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "User device token is required"
    );
  }
  const student = await Student.findById(req.user.userId);
  if (!student) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student details not found");
  }
 const response = await Student.findByIdAndUpdate(
   req.user.userId,
   { $addToSet: { deviceTokens: token } },
   { new: true }
 );


  console.log("Response after adding device token : ",response);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {}, "Device token added"));
};

export const sendNotificationToDevices = async(req,res) => {

}