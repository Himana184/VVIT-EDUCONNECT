import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Student from "../models/student.model.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import admin from "firebase-admin";
import serviceAccount from "../firebaseAccount.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send notification to a single token
async function sendNotification(token, title, body) {
  try {
    const message = {
      token: token,
      notification: {
        body,
        title,
      },
    };
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error("Error sending notification to token:", token, error);
  }
}

// Method to send notifications to multiple tokens
export const sendNotificationsToTokens = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Title and Body of notification are required"
    );
  }
  const tokens = await getAllDeviceTokens();
  const responses = await Promise.all(
    tokens.map((token) => sendNotification(token, title, body))
  );
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { responses },
        "Notifications sent successfully"
      )
    );
};

export const getAllDeviceTokens = async () => {
  const students = await Student.find({});
  const tokens = students.reduce((acc, student) => {
    return acc.concat(student.deviceTokens);
  }, []);
  return tokens;
};

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

  console.log("Response after adding device token : ", response);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {}, "Device token added"));
};
