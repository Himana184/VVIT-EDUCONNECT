import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { announcementRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Announcement from "../models/announcement.model.js";
import mongoose from "mongoose";
import uploadSingleFile from "../utils/uploadToCloud.js";

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
    const fileUploadResponse = await uploadSingleFile(req.file);
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

  const announcements = await Announcement.find({});

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
  const announcements = await Announcement.find({}).sort({ createdAt: -1 });
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
  const response = await Announcement.findByIdAndUpdate(
    announcementId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  const announcements = await Announcement.find({}).sort({ createdAt: -1 });

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
  console.log(announcementId);
  //check whether it is a valid announcement id or not
  if (!mongoose.isValidObjectId(announcementId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Announcement Id");
  }

  const response = await Announcement.findOneAndDelete(announcementId);

  //fetch all anouncements
const announcements = await Announcement.find({}).sort({ createdAt: -1 });

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
