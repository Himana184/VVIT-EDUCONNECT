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
async function sendNotification(token) {
  try {
    const message = {
      // Specify either token or topic (not both):
      token: token, // For sending to a specific device
      // OR
      // topic: "your_topic_name", // For sending to a topic

      notification: {
        body: "This is an FCM notification message!",
        title: "FCM Message",
      },
    };
    console.log(message);
    await admin.messaging().send(message);
    console.log("Notification sent successfully to token:", token);
    
  } catch (error) {
    console.error("Error sending notification to token:", token, error);
    
  }
}

// Method to send notifications to multiple tokens
export const sendNotificationsToTokens = async (req,res) => {
  try {
    const tokens = await getAllDeviceTokens();
    console.log(tokens);
    // Send notifications to all tokens concurrently
    const responses = await Promise.all(
      tokens.map((token) => sendNotification(token))
    );
    console.log("All notifications sent successfully:", responses);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, {}, "Notifications sent successfully")
      );
  } catch (error) {
    console.error("Failed to send one or more notifications:", error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,"Error sending notifications")
  }
};

export const getAllDeviceTokens = async () => {
  const students = await Student.find({});
  console.log(students);
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
