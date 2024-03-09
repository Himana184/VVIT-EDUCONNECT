import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { certificationRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Certification from "../models/certification.model.js";
import mongoose from "mongoose";
import { groupData } from "../utils/groupdata.js";
import uploadSingleFile from "../utils/uploadToCloud.js";
const currentYear = new Date().getFullYear();

// TODO: Integration with google cloud

// Access permission - student can add certification
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
  const fileType = req.file.originalname.split(".")[1]
  //upload the image of the student to cloud.
  const uploadResponse = await uploadSingleFile(
    req.file,
    "certification-files",
    req.body.name.replace(/\s+/g, "")+"."+fileType
  );
  
  if (!uploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload certification"
    );
  }
  //set the link value to the response url from the upload.
  req.body.link = uploadResponse.url;
  req.body.student = req.user.userId;
  const newCertification = await Certification.create(req.body);

  //return all the certifications of the student
  const certifications = await getCertificationsByRole(req);

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

// Access permission - student will update the certification
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

  const certifications = await getCertificationsByRole(req);

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

// Access permission - Admin, coordinator
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

// access permission - Admin, coordinator - will group the certification by issuer name
export const getAllCertifications = async (req, res) => {
  
  const certifications = await getCertificationsByRole(req);
  const groupedCertifications = groupData(certifications, "issuer");
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { certifications: groupedCertifications },
        "certifications data sent"
      )
    );
};

// access permission - admin, coordinator, student
export const handleDeleteCertification = async (req, res) => {
  const certificationId = req.params.certificationId;

  if (!mongoose.isValidObjectId(certificationId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid certification Id");
  }

  const response = await Certification.findByIdAndDelete(certificationId);

  const certifications = await getCertificationsByRole(req);

  const groupedCertifications = groupData(certifications, "issuer");

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { certifications: groupedCertifications },
        `Certification ${response.name} deleted successfully`
      )
    );
};


// helper function to get certifications by role
export const getCertificationsByRole = async (req) => {
  let certifications = [];
  if (req.user.role === "admin") {
    certifications = await Certification.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else if (req.user.role === "coordinator") {
    certifications = await Certification.find({ branch: req.user.branch })
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
    certifications = await Certification.find({
      student: req.user.userId,
    }).sort({
      createdAt: -1,
    }).populate("student");
  }

  return certifications;
};
