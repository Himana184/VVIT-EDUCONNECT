import Student from "../models/student.model.js";
import Internship from "../models/internship.model.js";
import Course from "../models/course.model.js";
import Certification from "../models/certification.model.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { studentRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import uploadSingleFile from "../utils/uploadToCloud.js";

//student registeration
const currentYear = new Date().getFullYear();

export const handleStudentRegisteration = async (req, res) => {
  //verify whether all the details are received or not
  const validationResponse = checkRequiredFields(
    req.body,
    studentRequiredFields
  );

  if (!validationResponse.status) {
    throw new ApiError(StatusCodes.BAD_REQUEST, validationResponse.message);
  }

  //check whether the details are previously registered in the db
  const { collegeMail, personalMail, rollNumber, contact } = req.body;

  const student = await Student.findOne({
    $or: [{ collegeMail }, { rollNumber }, { personalMail }, { contact }],
  });

  // if student is already registered
  if (student) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "student with given details already exists"
    );
  }

  const fileType = req.file.originalname.split(".")[1]
  //upload the image of the student to cloud.
  const uploadResponse = await uploadSingleFile(
    req.file,
    "student-images",
    req.body.name.replace(/\s+/g, "")+"."+fileType
  );
  
  if (!uploadResponse.status) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to upload student photo"
    );
  }
  //set the image value to the response url from the upload.
  req.body.image = uploadResponse.url;

  //create a new student 
  const newStudent = await Student.create(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { student: newStudent },
        "student resgisteration successful"
      )
    );
};

export const getStudentDetails = async (req, res) => {
  const { studentId } = req.params;

  //check whether the student id is valid or not
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  //fetch the details of the student with the given id
  const student = await Student.findById(studentId).populate([
    "internships",
    "courses",
    "certifications",
  ]);

  //if no student is found
  if (!student) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student details not found");
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { student: student },
        "student details sent"
      )
    );
};

//need to add pagination to it as there will be a large number of students
export const getAllStudents = async (req, res) => {
  var students = [];

  students = await getStudentsByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { students }, "students details sent")
    );
};

export const updateStudentDetails = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student details not found");
  }

  const updatedStudentDetails = await Student.findByIdAndUpdate(
    studentId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  const students = await getStudentsByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { students },
        `Details of ${updatedStudentDetails.name} updated`
      )
    );
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student details not found");
  }

  const [
    studentResponse,
    internshipResponse,
    courseResponse,
    certificationResponse,
  ] = await Promise.all([
    Student.findByIdAndDelete(studentId),
    Internship.deleteMany({ student: studentId }),
    Course.deleteMany({ student: studentId }),
    Certification.deleteMany({ student: studentId }),
  ]);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        [
          studentResponse,
          internshipResponse,
          courseResponse,
          certificationResponse,
        ],
        `Student ${studentResponse?.name} details deleted, along with associated records`
      )
    );
};
export const getStudentsByRole = async (role) => {
  let students = [];
  if (req.user.role === "admin") {
    students = await Student.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else if (req.user.role === "coordinator") {
    students = await Student.find({ branch: req.user.branch })
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
    students = await Student.find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }

  return students;
};
