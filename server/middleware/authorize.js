import { ApiError } from "../utils/ApiError";

export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return next(
        new ApiError(
          StatusCodes.FORBIDDEN,
          `${req.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
