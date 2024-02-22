import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { courseRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Course from "../models/course.model.js";
import mongoose from "mongoose";
import uploadSingleFile from "../utils/uploadToCloud.js";
const currentYear = new Date().getFullYear();

export const handleAddCourse = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    courseRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  //set the branch of the user so that it is easy to filter the courses based on branch
  req.body.branch = req.user.branch;
  const fileType = req.file.originalname.split(".")[1]
  //upload the image of the course certificate to cloud.
  const uploadResponse = await uploadSingleFile(
    req.file,
    "coursecertificate-images",
    req.body.courseName.replace(/\s+/g, "")+"."+fileType
  );
  
  if (!uploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload course completion certificate"
    );
  }
  //set the image value to the response url from the upload.
  req.body.certificate = uploadResponse.url;

  const newCourse = await Course.create(req.body);

  //return all the courses of the student
  const courses = await Course.find({ student: req.user.userId }).sort({
    createdAt: 1,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { courses },
        `Course ${newCourse.courseName} has been added`
      )
    );
};

export const handleUpdateCourse = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId || !mongoose.isValidObjectId(courseId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid course Id");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(StatusCodes.NOT_FOUND, "course details not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    runValidators: true,
    new: true,
  });

  const courses = await getCoursesByRole(req.user.role);

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        courses,
      },
      `course ${updatedCourse.courseName} updated`
    )
  );
};

export const getStudentCourses = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  const courses = await Course.find({ student: studentId });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { courses },
        "Student courses details sent"
      )
    );
};

export const getAllCourses = async (req, res) => {
  const courses = await getCoursesByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { courses }, "courses data sent")
    );
};

export const handleDeleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!mongoose.isValidObjectId(courseId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid course Id");
  }

  const response = await Course.findByIdAndDelete(courseId);

  //get the courses by role if role is admin then return all the data, if coordinator return only branch students data else return student courses
  let courses = await getCoursesByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { courses },
        `course ${response.courseName} has been deleted`
      )
    );
};

export const getCoursesByRole = async (role) => {
  let courses = [];
  if (req.user.role === "admin") {
    courses = await Course.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else if (req.user.role === "coordinator") {
    courses = await Course.find({ branch: req.user.branch })
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
    courses = await Course.find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }

  return courses;
};
