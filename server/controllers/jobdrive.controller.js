import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { jobDriveRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import JobDrive from "../models/jobdrive.model.js";
import mongoose from "mongoose";
import { uploadMultipleFiles } from "../utils/uploadToCloud.js";
import jobdriveModel from "../models/jobdrive.model.js";
//const currentYear = new Date().getFullYear();

export const handleAddJobDrive = async (req, res) => {
  console.log(req.body);
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
  console.log(req.files);
  const uploadFilesResponse = await uploadMultipleFiles(
    req.files,
    "job-drive-files"
  );
  console.log(uploadFilesResponse);
  if (!uploadFilesResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload files"
    );
  }

  req.body.files = uploadFilesResponse.files;
  console.log(req.body);
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

export const getJobDriveDetails = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.isValidObjectId(jobId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid job Id");
  }
  const jobDrive = await JobDrive.findById(jobId).populate("optedStudents");
  if (!jobDrive) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job Drive details not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { job: jobDrive },
        "Job drive details fetched"
      )
    );
};

export const getAllJobDrives = async (req, res) => {
  const jobDrives = await JobDrive.find({}).sort({ createdAt: -1 });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { jobDrives }, "Job Drives data sent")
    );
};

export const handleDeleteJobDrive = async (req, res) => {
  const jobDriveId = req.params.jobId;

  if (!mongoose.isValidObjectId(jobDriveId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Job Drive Id");
  }
  const response = await JobDrive.findById(jobDriveId);
  //fetch all jobdrives

  const jobDrives = await JobDrive.find({}).sort({ createdAt: -1 });
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
export const handleStudentOptIn = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user.userId;

  if (!mongoose.isValidObjectId(jobId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid job");
  }

  const job = await JobDrive.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Job Drive details not found");
  }

  const updatedJob = await JobDrive.findByIdAndUpdate(
    jobId,
    { $push: { optedStudents: userId } },
    { new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { job: updatedJob },
        `Opted in for ${updatedJob.companyName} drive`
      )
    );
};

export const handleStudentOptOut = async (req, res) => {
  const jobId = req.params.jobId;
  if (!mongoose.isValidObjectId(jobId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid job");
  }

  const job = await JobDrive.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Job Drive details not found");
  }

  const userId = req.user.userId;
  const updatedJob = await JobDrive.updateOne(
    { _id: jobId },
    { $pull: { optedStudents: userId } },
    { new: true }
  );

  const updatedDetails = await JobDrive.findById(jobId);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { job: updatedDetails },
        `Opted out from ${job.companyName} drive`
      )
    );
};
