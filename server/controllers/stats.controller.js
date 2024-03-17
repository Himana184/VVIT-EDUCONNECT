import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse.js";
import Internship from "../models/internship.model.js";
export const getInternshipsCountByPassouYear = async (req, res) => {
  const result = await Internship.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
    {
      $group: {
        _id: {
          $cond: [
            { $ne: ["$studentDetails.passoutYear", ""] },
            "$studentDetails.passoutYear",
            null,
          ],
        },
        count: { $sum: 1 },
      },
    },
    {
      $match: { _id: { $ne: null } }, // Exclude documents where passoutYear is empty
    },
  ]);

  const countsByPassoutYear = {};
  result.forEach((entry) => {
    const passoutYear = parseInt(entry._id); // Convert to integer
    countsByPassoutYear[passoutYear] = entry.count;
  });


  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { countsByPassoutYear },
        "Internships count sent"
      )
    );
};
