import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

export const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login")) {
    const logData = `Request URL: ${req.url} LogData: ${JSON.stringify(
      req.body
    )}`;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
