import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { announcementRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Announcement from "../models/announcement.model.js";
import mongoose from "mongoose";
import uploadSingleFile from "../utils/uploadToCloud.js";
import { logActivity } from "../utils/logActivity.js";
import { logcategories } from "../utils/logcategories.js";
import redisClient from "../utils/redisclient.js";
import { getCacheValue, setCacheValue } from "../utils/rediscache.js";

export const handleAddAnnouncement = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    announcementRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  if (req.file) {
    const fileType = req.file.originalname.split(".")[1];
    const fileUploadResponse = await uploadSingleFile(
      req.file,
      "announcement-files",
      req.body.title.replace(/\s+/g, "") + "." + fileType
    );
    if (!fileUploadResponse.status) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unable to uplaod file"
      );
    } else {
      req.body.file = fileUploadResponse.url;
    }
  }
  const newAnnouncement = await Announcement.create(req.body);

  const announcements = await Announcement.find({}).sort({ createdAt: -1 });
  setCacheValue("announcements", announcements);
  logActivity(
    req,
    res,
    logcategories["announcement"],
    `An announcement with title ${req.body.title} has been added by the user ${req.user.userId}`
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { announcements },
        `Announcement for ${newAnnouncement.title} has been created`
      )
    );
};

export const getAllAnnouncements = async (req, res) => {
  const keyExists = await redisClient.exists("announcements");
  var announcements = [];
  if (keyExists != 0) {
    announcements = await getCacheValue("announcements");
  } else {
    announcements = await Announcement.find({}).sort({
      createdAt: -1,
    });
    setCacheValue("announcements", announcements);
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { announcements },
        "Announcements data sent"
      )
    );
};

export const handleUpdateAnnouncement = async (req, res) => {
  const announcementId = req.params.announcementId;

  if (!mongoose.isValidObjectId(announcementId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid announcement Id");
  }

  const announcement = await Announcement.findById(announcementId);

  if (!announcement) {
    throw new ApiError("Announcement not found", StatusCodes.NOT_FOUND);
  }

  if (req.file) {
    const fileType = req.file.originalname.split(".")[1];
    const fileUploadResponse = await uploadSingleFile(
      req.file,
      "announcement-files",
      req.body.title.replace(/\s+/g, "") + "." + fileType
    );
    if (!fileUploadResponse.status) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unable to upload files"
      );
    } else {
      req.body.file = fileUploadResponse.url;
    }
  }
  const response = await Announcement.findByIdAndUpdate(
    announcementId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  const announcements = await Announcement.find({}).sort({ createdAt: -1 });
  setCacheValue("announcements", announcements);
  logActivity(
    req,
    res,
    logcategories["announcement"],
    `${req.user.role != "student" ? "User" : "Student"} with id ${req.user.userId} has accessed the announcements`
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { announcements },
        `Announcement ${response.title} updated`
      )
    );
};

export const handleDeleteAnnouncement = async (req, res) => {
  const { announcementId } = req.params;
  //check whether it is a valid announcement id or not
  if (!mongoose.isValidObjectId(announcementId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Announcement Id");
  }

  const response = await Announcement.findByIdAndDelete(announcementId);

  //fetch all anouncements
  const announcements = await Announcement.find({}).sort({ createdAt: -1 });
  setCacheValue("announcements", announcements);
  logActivity(
    req,
    res,
    logcategories["announcement"],
    `User with id ${req.user.userId} has deleted the announcement with title ${response?.title}`
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { announcements },
        `Announcement of ${response.title} has been deleted`
      )
    );
};
