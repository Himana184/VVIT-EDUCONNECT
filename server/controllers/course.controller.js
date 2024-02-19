import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { checkRequiredFields } from "../utils/requiredFields";
import { courseRequiredFields } from "./constants";
import { ApiResponse } from "../utils/ApiResponse";
import Course from "../models/course.model";
import mongoose from "mongoose";
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

  const courses = await Course.find({ student: req.user.userId }).sort({
    createdAt: 1,
  });

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
  const courses = await Course.find({})
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
      new ApiResponse(StatusCodes.OK, { courses }, "certifications data sent")
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
    courses = await Course.find({}).sort({ createdAt: -1 });
  } else if (req.user.role === "coordinator") {
    courses = await Course.find({ branch: req.user.branch }).sort({
      createdAt: -1,
    });
  } else {
    courses = await Course.find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }
};
