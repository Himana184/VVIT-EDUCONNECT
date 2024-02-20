import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { internshipRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Internship from "../models/internship.model.js";
import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

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

  //return all the internships of the student
  const internships = await getInternshipsByRole(req.user.role);
  
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { internships },
        `Internship at ${newInternship.companyName} has been added`
      )
    );
};

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

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        internships,
      },
      `Internship details of ${updatedInternship.companyName} updated`
    )
  );
};

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


  internship.verificationStatus = req.body.verificationStatus;
  await internship.save();
  const internships = await getInternshipsByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships },
        `Internship marked as ${verificationStatus}`
      )
    );
};

export const getStudentInternships = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

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

export const getAllInternships = async (req, res) => {
  const internships = await getInternshipsByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { internships }, "Internships data sent")
    );
};

export const handleDeleteInternship = async (req, res) => {
  const internshipId = req.params.internshipId;
  if (!mongoose.isValidObjectId(internshipId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid certification Id");
  }
  const response = await Internship.findByIdAndDelete(internshipId);
  const internships = await getInternshipsByRole(req.user.role);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { internships },
        `internship ${response.companyName} deleted successfully`
      )
    );
};
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
