import { createLogger, format, transports } from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import dotenv from "dotenv";
dotenv.config();

const loggingWinston = new LoggingWinston({
  projectId: process.env.GCP_LOGS_PROJECT_ID,
  keyFile: "logKeyfile.json",
});

export const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "logs.log",
    }),
    loggingWinston,
  ],
  format: format.combine(format.timestamp(), format.json()),
});
