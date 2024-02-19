import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { checkRequiredFields } from "../utils/requiredFields";
import { announcementRequiredFields } from "./constants";
import { ApiResponse } from "../utils/ApiResponse";
import Announcement from "../models/announcement.model";
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
    
    const announcements = await Announcement.find({})
    .populate("branches")  // Populate branches if needed
    .exec();
  
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
    const { announcementIds } = req.body;
    const response = await Announcement.deleteMany({ _id: { $in: announcementIds } });
    return res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK,{response},"Announcement deleted successfully"))
  };
