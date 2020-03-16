import winston, { transports, format } from "winston";
import config from "./config";

const level = config.app.debug ? "debug" : "info";

const consoleFormat = format.combine(
  format.errors({ stack: true }),
  format.colorize(),
  format.timestamp({ format: "HH:mm:ss.SSS" }),
  format.cli(),
  format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  format.metadata()
);

const logger = winston.createLogger({
  level: level,
  transports: [
    new transports.Console({
      format: consoleFormat
    })
  ]
});

export default logger;
