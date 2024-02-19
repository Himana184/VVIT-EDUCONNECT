import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { checkRequiredFields } from "../utils/requiredFields";
import { certificationRequiredFields } from "./constants";
import { ApiResponse } from "../utils/ApiResponse";
import Certification from "../models/certification.model";
import mongoose from "mongoose";
const currentYear = new Date().getFullYear();

export const handleAddCertification = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    certificationRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  //set the branch of the user so that it is easy to filter the certifications based on branch
  req.body.branch = req.user.branch;

  const newCertification = await Certification.create(req.body);

  //return all the certifications of the student
  const certifications = await Certification.find({
    student: req.user.userId,
  }).sort({
    createdAt: 1,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { certifications },
        `Certification on ${newCertification.name} has been added`
      )
    );
};

export const handleUpdateCertification = async (req, res) => {
  const { certificationId } = req.params;

  if (!certificationId || !mongoose.isValidObjectId(certificationId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid certification Id");
  }

  const certification = await Certification.findById(certificationId);

  if (!certification) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "certification details not found"
    );
  }

  const updatedCertification = await Certification.findByIdAndUpdate(
    certificationId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  const certifications = await Certification.find({
    student: req.user.userId,
  }).sort({
    createdAt: 1,
  });

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        certifications,
      },
      `certification details on ${updatedCertification.name} updated`
    )
  );
};

export const getStudentCertifications = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  const certifications = await Certification.find({ student: studentId });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { certifications },
        "Student certification details sent"
      )
    );
};

export const getAllCertifications = async (req, res) => {
  const certifications = await Certification.find({})
    .populate({
      path: "student",
      match: {
        passoutYear: { $gte: currentYear },
      },
    })
    .exec();

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { certifications },
        "certifications data sent"
      )
    );
};

export const handleDeleteCertification = async (req, res) => {
  const certificationId = req.params.certificationId;
  if (!mongoose.isValidObjectId(certificationId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid certification Id");
  }
  const response = await Certification.findByIdAndDelete(certificationId);
  const certifications = await Certification.find({ student: req.user.userId });
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { certifications },
        `Certification ${response.name} deleted successfully`
      )
    );
};
export const getCertificationsByRole = async (role) => {
  let certifications = [];
  if (req.user.role === "admin") {
    certifications = await Certification.find({}).sort({ createdAt: -1 });
  } else if (req.user.role === "coordinator") {
    certifications = await Certification.find({ branch: req.user.branch }).sort({
      createdAt: -1,
    });
  } else {
    certifications = await Certification .find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }
};
