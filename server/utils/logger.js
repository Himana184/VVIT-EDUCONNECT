import { createLogger, format, transports } from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import dotenv from "dotenv";
dotenv.config();
const loggingWinston = new LoggingWinston({
  projectId: process.env.GCP_LOGS_PROJECT_ID,
  keyFile: "logKeyfile.json",
});
const myFormat = format.printf(({ level, meta, timestamp }) => {
  console.log(meta);
  return `${timestamp} ${level}: ${"message"}`;
});
export const logger = createLogger({
  transports: [
    // new transports.Console(),
    new transports.File({
      level: "info",
      filename: "logs.json",
    }),
    loggingWinston,
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.metadata(),
  ),
});
