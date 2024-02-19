import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { checkRequiredFields } from "../utils/requiredFields";
import { jobDriveRequiredFields } from "./constants";
import { ApiResponse } from "../utils/ApiResponse";
import JobDrive from "../models/jobdrive.model.js";
import mongoose from "mongoose";
//const currentYear = new Date().getFullYear();

export const handleAddJobDrive = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    jobDriveRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  //set the branch of the user so that it is easy to filter the jobs based on branch
  req.body.branch = req.user.branch;

  const newJobDrive = await JobDrive.create(req.body);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { jobdrives },
        `Offer at ${newJobDrive.companyName} has been added`
      )
    );
};


export const getAllJobDrives = async (req, res) => {
    
    const jobDrives = await JobDrive.find({})
    .populate("optedStudents")  // Populate optedStudents if needed
    .exec();
  
    return res
     .status(StatusCodes.OK)
     .json(
        new ApiResponse(
            StatusCodes.OK,
            { jobDrives },
            "Job Drives data sent"
        )
        );
    
  };

export const handleDeleteJobDrive = async (req, res) => {
  const { jobdriveIds } = req.body;
  const response = await JobDrive.deleteMany({ _id: { $in: jobdriveIds } });
  return res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK,{response},"Jobdrive deleted successfully"))
};