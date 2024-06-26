import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { internshipRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Internship from "../models/internship.model.js";
import mongoose from "mongoose";
import { groupData } from "../utils/groupdata.js";
import uploadSingleFile from "../utils/uploadToCloud.js";
import { logActivity } from "../utils/logActivity.js";
import { logcategories } from "../utils/logcategories.js";
const currentYear = new Date().getFullYear();

// TODO: Google Cloud Integration for storing internship offer and completion certificaton
// TODO: Add a controller for uploading completion certificate of the internship

// Access permission - Student
export const handleAddInternship = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    internshipRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  //set the branch of the user so that it is easy to filter the internships based on branch
  req.body.branch = req.user.branch;
  req.body.student = req.user.userId;
  const fileType = req.file.originalname.split(".")[1];
  const fileUploadResponse = await uploadSingleFile(
    req.file,
    "internship-offerLetters",
    req.body.companyName.replace(/\s+/g, "") + req.user.userId + "." + fileType
  );
  if (!fileUploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload file"
    );
  } else {
    req.body.offerLetter = fileUploadResponse.url;
  }

  const newInternship = await Internship.create(req.body);

  //fetch the internships based on role
  const internships = await getInternshipsByRole(req);

  //group the internships based on the verification status this will be helpful to filter in the frontend
  const groupedInternships = groupData(internships, "verificationStatus");
  logActivity(
    req,
    res,
    logcategories["internship"],
    `Student with id ${req.user.userId} has added the internship from ${req.body.companyName}`
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { internships: groupedInternships },
        `Internship at ${newInternship.companyName} has been added`
      )
    );
};

// Access permission - Student
export const handleUpdateInternship = async (req, res) => {
  const { internshipId } = req.params;
  if (!internshipId || !mongoose.isValidObjectId(internshipId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid internship Id");
  }

  const internship = await Internship.findById(internshipId);

  if (!internship) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Internship details not found");
  }

  const updatedInternship = await Internship.findByIdAndUpdate(
    internshipId,
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );

  const internships = await getInternshipsByRole(req);

  const groupedInternships = groupData(internships, "verificationStatus");
  logActivity(
    req,
    res,
    logcategories["internship"],
    `Student with id ${req.user.userId} has updated the internship from ${updatedInternship.companyName}`
  );

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        internships: groupedInternships,
      },
      `Internship details of ${updatedInternship.companyName} updated`
    )
  );
};

// Access permission - Admin, Coordinator of that branch
export const handleInternshipVerification = async (req, res) => {
  const { internshipId } = req.params;
  if (!internshipId || !mongoose.isValidObjectId(internshipId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid Internship id");
  }

  const internship = await Internship.findById(internshipId);
  if (!internship) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Internship details not found");
  }

  const verificationStatus = internship.verificationStatus;

  if (verificationStatus === req.body.verificationStatus) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      `Internship already ${verificationStatus}`
    );
  }
  const updatedDetails = await Internship.findByIdAndUpdate(
    internshipId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  //fetch and group the internship based on verification status
  const internships = await getInternshipsByRole(req);

  const groupedInternships = groupData(internships, "verificationStatus");
  logActivity(
    req,
    res,
    logcategories["certification"],
    `Admin updated verification status of intenrship ${updatedDetails.companyName} for Student with id ${req.user.userId} `
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships: groupedInternships },
        `Internship marked as ${updatedDetails.verificationStatus}`
      )
    );
};

// Access permission - Admin, Coordinator, Student
export const getStudentInternships = async (req, res) => {
  const { studentId } = req.params;

  //check whether it is a valid student id or not ( valid mongodb id or not )
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  //get all the internships of the student
  const internships = await Internship.find({ student: studentId });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships },
        "Student internship details sent"
      )
    );
};

// Access permission - Admin, Coordinator, Student - based on their roles data will be sent back
export const getAllInternships = async (req, res) => {
  console.log("Internships requested");
  const internships = await getInternshipsByRole(req);

  const groupedInternships = await groupData(internships, "verificationStatus");
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships: groupedInternships },
        "Internships data sent"
      )
    );
};

// Access permission - Admin, Coordinator, Student
export const handleDeleteInternship = async (req, res) => {
  const internshipId = req.params.internshipId;

  //check whether received mongodb id is valid or not
  if (!mongoose.isValidObjectId(internshipId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid certification Id");
  }

  const response = await Internship.findByIdAndDelete(internshipId);

  //fetch and group the internships based on verification status
  const internships = await getInternshipsByRole(req);
  const groupedInternships = groupData(internships, "verificationStatus");
  logActivity(
    req,
    res,
    logcategories["internship"],
    `Student with id ${req.user.userId} has deleted the internship with name ${response?.companyName}`
  );
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships: groupedInternships },
        `internship ${response.companyName} deleted successfully`
      )
    );
};

export const handleCompletionCertificateUpload = async (req, res) => {
  const internshipId = req.body.internshipId;
  if (!internshipId || !mongoose.isValidObjectId(internshipId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid internshipId");
  }
  const internship = await Internship.findById(internshipId);
  if (!internship) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Internship Details not found");
  }
  const fileType = req.file.originalname.split(".")[1];
  const fileUploadResponse = await uploadSingleFile(
    req.file,
    "internship-completion-certificates",
    internship.companyName.replace(/\s+/g, "") +
      req.user.userId +
      "." +
      fileType
  );
  if (!fileUploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload file"
    );
  } else {
    internship.completionCertificate = fileUploadResponse.url;
  }
  await internship.save();

  //fetch the internships based on role
  const internships = await getInternshipsByRole(req);

  //group the internships based on the verification status this will be helpful to filter in the frontend
  const groupedInternships = groupData(internships, "verificationStatus");
  logActivity(
    req,
    res,
    logcategories["internship"],
    `Student with id ${req.user.userId} has uplaoded the internship completion certificate`
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { internships: groupedInternships },
        `Internship completion certificate added`
      )
    );
};

// Helper function to fetch data by role of the user and return it
export const getInternshipsByRole = async (req) => {
  let internships = [];
  if (req.user.role === "admin") {
    internships = await Internship.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else if (req.user.role === "coordinator") {
    internships = await Internship.find({ branch: req.user.branch })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else {
    internships = await Internship.find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }

  return internships;
};
