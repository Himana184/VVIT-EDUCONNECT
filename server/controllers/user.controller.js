import { StatusCodes } from "http-status-codes";
import { checkRequiredFields } from "../utils/requiredFields.js";
import { userRequiredFields } from "./constants.js";
import { studentRequiredFields } from "./constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
export const handleUserRegisteration = async (req, res) => {
  const validationResponse = checkRequiredFields(
    req.body,
    userRequiredFields
  );

  if (!validationResponse.status) {
    throw new ApiError(StatusCodes.BAD_REQUEST, validationResponse.message);
  }

  const { email, contact } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { contact }],
  });

  if (user) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "user with given details already exists"
    );
  }

  const newUser = await User.create(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { user: newUser },
        "user resgisteration successful"
      )
    );
}; 
export const addCoordinator = async (req, res) => {
   const validationResponse = checkRequiredFields(
    req.body,
    userRequiredFields
  );

  if (!validationResponse.status) {
    throw new ApiError(StatusCodes.BAD_REQUEST, validationResponse.message);
  }
    const iscoordinator = await User.findOne({ email });
    if (iscoordinator) {
      throw new Error("coordinator already exists", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const newCoordinator = await User.create(req.body);
    const coordinators = await User.find({ isActive: true });
    return res.status(StatusCodes.OK).json({
      message: `Coordinator ${newCoordinator.name} details added successfully`,
      coordinators,
    });
  };
  export const deleteCoordinator = async (req, res) => {
    const coordinatorId = req.params.coordinatorId;
    console.log(coordinatorId);
    if (!coordinatorId || !mongoose.isValidObjectId(coordinatorId)) {
      throw new Error("Invalid coordinator", StatusCodes.BAD_REQUEST);
    }
    const coordinator = await User.findById(coordinatorId);
  
    if (!coordinator) {
      throw new Error("Coordinator Not found", StatusCodes.NOT_FOUND);
    }
    const response = await User.findByIdAndDelete(
      coordinatorId,
      { isActive: !coordinator.isActive },
      { new: true, runValidators: true }
    );
    const coordinators = await User.find({});
    return res
      .status(StatusCodes.OK)
      .json({ message: `coordinator ${response.name} deleted`, coordinators });
  };
  export const updateCoordinatorDetails = async (req, res) => {
    const coordinatorId = req.params.coordinatorId;
    console.log(coordinatorId);
    if (!coordinatorId || !mongoose.isValidObjectId(coordinatorId)) {
      throw new Error("Invalid Coordinator", StatusCodes.BAD_REQUEST);
    }
    const coordinator = await User.findById(coordinatorId);
    if (!coordinator) {
      throw new Error("Coordinator Not found", StatusCodes.NOT_FOUND);
    }
    const response = await User.findByIdAndUpdate(
      coordinatorId,
      req.body,
      { new: true, runValidators: true }
    );
    const coordinators = await User.find({});
    return res.status(StatusCodes.OK).json({
      message: `Coordinator ${response.name} details updated`,
      coordinators,
    });
  };
  export const getAllCoordinators = async (req, res) => {
    const coordinators = await User.find({role : 'coordinator'});
    return res.status(StatusCodes.OK).json({
      message: "Coordinators details sent",
      count: coordinators.length,
      coordinators,
    });
  };
  export const addAdmin = async (req, res) => {
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password || !contact) {
      throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
    }
    const isAdmin = await User.findOne({ email });
    if (isAdmin) {
      throw new Error("Admin already exists", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const newAdmin = await User.create(req.body);
    return res.status(StatusCodes.OK).json({
      message: `Admin ${newAdmin.name} has been assigned the role of admin`,
    
    });
  };
  export const addStudent = async (req, res) => {
    const validationResponse = checkRequiredFields(
      req.body,
      studentRequiredFields
    );
  
    if (!validationResponse.status) {
      throw new ApiError(StatusCodes.BAD_REQUEST, validationResponse.message);
    }
    const isStudent = await Student.findOne({ email });
    if (isStudent) {
      throw new Error("Student already exists", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const newStudent = await Student.create(req.body);
    const students = await Student.find({});
  
    return res.status(StatusCodes.OK).json({
      message: `Student ${newStudent.name} details added successfully`,
      count: students.length,
      students,
    });
  };
  
  
