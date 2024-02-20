import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { checkRequiredFields } from "../utils/requiredFields";
import { queryRequiredFields } from "./constants";
import { ApiResponse } from "../utils/ApiResponse";
import Query from "../models/query.model";
import mongoose from "mongoose";
const currentYear = new Date().getFullYear();

export const handleAddQuery = async (req, res) => {
  //check whether all the required fields have been received or not
  const requiredFieldsValidation = checkRequiredFields(
    req.body,
    queryRequiredFields
  );

  //if required fields are not present
  if (!requiredFieldsValidation.status) {
    const { message } = requiredFieldsValidation;
    throw new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  //set the branch of the user so that it is easy to filter the queries based on branch
  req.body.branch = req.user.branch;

  const newQuery = await Query.create(req.body);

  //return all the queries of the student
  const queries = await Query.find({
    student: req.user.userId,
  }).sort({
    createdAt: 1,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        { queries },
        `Query on ${newQuery.category} has been added`
      )
    );
};

export const handleUpdateQuery = async (req, res) => {
  const { queryId } = req.params;

  if (!queryId || !mongoose.isValidObjectId(queryId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid query Id");
  }

  const query = await Query.findById(queryId);

  if (!query) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "query details not found"
    );
  }

  const updatedQuery = await Query.findByIdAndUpdate(
    queryId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  const queries = await getQueriesByRole(req.user.role);

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        queries,
      },
      `query details on ${updatedQuery.category} updated`
    )
  );
};

export const getStudentQueries = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid student Id");
  }

  const queries = await Query.find({ student: studentId });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { queries },
        "Student query details sent"
      )
    );
};

export const getAllQueries = async (req, res) => {
  const queries = getQueriesByRole(req.user.role);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { queries },
        "queries data sent"
      )
    );
};

export const handleDeleteQuery = async (req, res) => {
  const queryId = req.params.queryId;
  if (!mongoose.isValidObjectId(queryId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not a valid query Id");
  }
  const response = await Query.findByIdAndDelete(queryId);
  const queries = await getQueriesByRole(req.user.role);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { queries },
        `Query ${response.category} deleted successfully`
      )
    );
};
export const getQueriesByRole = async (role) => {
  let queries = [];
  if (req.user.role === "admin") {
    queries = await Query.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        match: {
          passoutYear: { $gte: currentYear },
        },
      });
  } else if (req.user.role === "coordinator") {
    queries = await Query.find({ branch: req.user.branch })
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
    queries = await Query.find({ student: req.user.userId }).sort({
      createdAt: -1,
    });
  }

  return queries;
};
