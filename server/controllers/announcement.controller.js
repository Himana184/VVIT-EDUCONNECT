import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { announcementRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Announcement from "../models/announcement.model.js";
import mongoose from "mongoose";
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
  
    //set the branch of the user so that it is easy to filter the announcements based on branch
    req.body.branch = req.user.branch;
  
    const newAnnouncement = await Announcement.create(req.body);

  
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          { certifications },
          `Announcement for ${newAnnouncement.branches} has been added`
        )
      );
  };
  export const getAllAnnouncements = async (req, res) => {
    
    const announcements = await getAnnouncementsByRole(req.user.role);
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
export const handleDeleteAnnouncement = async (req, res) => {
  const announcementId = req.params.announceId;

  if (!mongoose.isValidObjectId(announcementId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Announcement Id");
  }
  const response = await Announcement.findOneAndDelete(jobDriveId);
  //fetch all anouncements
  const announcements = await getAnnouncementsByRole(req.user.role);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { announcements },
        `Announcement of ${response.branches} has been deleted`
      )
    );
};
export const getAnnouncementsByRole = async (role) => {
  let announcements = [];
  if (req.user.role === "admin") {
    announcements = await Announcement.find({})
      .sort({ createdAt: -1 })
      .populate("description");
  } else if (req.user.role === "coordinator") {
    announcements = await Announcement.find({ branches: { $in: [req.user.branch] } })
      .sort({
        createdAt: -1,
      })
      .populate("description");
  } 
  return announcements;
};
