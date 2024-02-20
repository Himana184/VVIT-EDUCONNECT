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

  //create a new job drive with given details
  const newJobDrive = await JobDrive.create(req.body);

  //fetch all jobdrives
  const jobDrives = await JobDrive.find({}).sort({ createdAt: -1 });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { jobDrives },
        `Job drive of ${newJobDrive.companyName} has been added`
      )
    );
};

export const getAllJobDrives = async (req, res) => {
  const jobDrives = await getJobdrivesByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { jobDrives }, "Job Drives data sent")
    );
};

export const handleDeleteJobDrive = async (req, res) => {
  const jobDriveId = req.params.jobdriveId;

  if (!mongoose.isValidObjectId(jobDriveId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Job Drive Id");
  }
  const response = await JobDrive.findOneAndDelete(jobDriveId);
  //fetch all jobdrives
  const jobDrives = await getJobdrivesByRole(eq.user.role);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { jobDrives },
        `Job drive of ${response.companyName} has been deleted`
      )
    );
};
export const getJobdrivesByRole = async (role) => {
  let jobdrives = [];
  if (req.user.role === "admin") {
    jobdrives = await JobDrive.find({})
      .sort({ createdAt: -1 })
      .populate(["salary","eligibleBranches","companyName","category","roles","offerType","lastDate","description","jobLocation","skills"]);
  } else if (req.user.role === "coordinator") {
    jobdrives = await JobDrive.find({ eligibleBranches: { $in: [req.user.branch] } })
      .sort({
        createdAt: -1,
      })
      .populate(["salary","eligibleBranches","companyName","category","roles","offerType","lastDate","description","jobLocation","skills"]);
  } 
  return jobdrives;
};