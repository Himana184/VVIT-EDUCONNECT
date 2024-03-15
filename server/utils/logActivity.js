import { logger } from "./logger.js";

export const logActivity = (req, res,logCategory, activityMessage) => {
  logger.info(`${req.url} endpoint hit`, {
    request: {
      status: res.statusCode,
      url: req.url,
      method: req.method,
      remoteIp: req.connection.remoteAddress,
      category : logCategory
    },
    activity: {
      message: activityMessage,
    },
  });
};
