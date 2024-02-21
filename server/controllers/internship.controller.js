import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { internshipRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Internship from "../models/internship.model.js";
import mongoose from "mongoose";
import { groupData } from "../utils/groupdata.js";

const currentYear = new Date().getFullYear();

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

  const newInternship = await Internship.create(req.body);

  //fetch the internships based on role
  const internships = await getInternshipsByRole(req.user.role);

  //group the internships based on the verification status this will be helpful to filter in the frontend
  groupedInternships = groupData(internships, "verificationStatus");

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
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  const internships = await getInternshipsByRole(req.user.role);

  const groupedInternships = groupData(internships, "verificationStatus");

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
  //save the verification status of the internship
  internship.verificationStatus = req.body.verificationStatus;
  await internship.save();

  //fetch and group the internship based on verification status
  const internships = await getInternshipsByRole(req.user.role);

  const groupedInternships = groupData(internships, "verificationStatus");

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships: groupedInternships },
        `Internship marked as ${verificationStatus}`
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
  const internships = await getInternshipsByRole(req.user.role);

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
  const internships = await getInternshipsByRole(req.user.role);
  const groupedInternships = groupData(internships, "verificationStatus");
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

// Helper function to fetch data by role of the user and return it
export const getInternshipsByRole = async (role) => {
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