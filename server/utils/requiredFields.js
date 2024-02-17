import { StatusCodes } from "http-status-codes";

export const checkRequiredFields = (data, requiredFields) => {
  if (!data) {
    return { status: false, message: "Data is missing" };
  }
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    return {
      status: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  return { status: true, message: "Validation successful" };
};
