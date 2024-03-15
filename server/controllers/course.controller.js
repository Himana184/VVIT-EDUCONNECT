import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { courseRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Course from "../models/course.model.js";
import mongoose from "mongoose";
import uploadSingleFile from "../utils/uploadToCloud.js";
import { logActivity } from "../utils/logActivity.js";
import { logcategories } from "../utils/logcategories.js";
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
  req.body.student = req.user.userId;
  
  const newCourse = await Course.create(req.body);

  const courses = await Course.find({ student: req.user.userId }).sort({
    createdAt: -1,
  });
  logActivity(
    req,
    res,
    logcategories["course"],
    `Student with id ${req.user.userId} has added the course ${newCourse._id}`
  );
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
  logActivity(
    req,
    res,
    logcategories["course"],
    `Student with id ${req.user.userId} has updated the course with id ${courseId}`
  );

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
  const courses = await getCoursesByRole(req);
  logActivity(
    req,
    res,
    logcategories["course"],
    `User with id ${req.user.userId} has accessed all the courses`
  );
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, { courses }, "courses data sent"));
};

export const handleDeleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!mongoose.isValidObjectId(courseId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid course Id");
  }
  const response = await Course.findByIdAndDelete(courseId);
  //get the courses by role if role is admin then return all the data, if coordinator return only branch students data else return student courses
  let courses = await getCoursesByRole(req);
  logActivity(
    req,
    res,
    logcategories["course"],
    `Student with id ${req.user.userId} has deleted the course ${response?.name}`
  );
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

export const getCoursesByRole = async (req) => {
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
    courses = await Course.find({ student: req.user.userId }).sort({});
  }

  console.log("courses : ", courses);
  return courses;
};
