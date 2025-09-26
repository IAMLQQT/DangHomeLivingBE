import { Injectable, Logger } from "@nestjs/common";
import stringify from "json-stringify-safe";
import * as winston from "winston";
import "winston-daily-rotate-file";

const options = {
  info: {
    level: "info",
    filename: "./logs/info.log",
    json: true,
    maxSize: 10485760,
    maxFiles: 5,
    colorize: false,
  },
  error: {
    level: "error",
    filename: "./logs/error.log",
    handleExceptions: true,
    json: true,
    maxSize: 10485760,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  rotateFile: {
    filename: "./logs/files/file.%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: 10485760,
    maxFiles: "60d",
  },
};

export const LOG_FILE_TEMPLATE =
  "METHOD=[%s], PROCESS_TIME=[%s] ms, IP=[%s], USERNAME=[%s], " +
  "PATH=[%s], PARAMS=[%s], QUERY=[%s], BODY=[%s], DEVICE_INFO=[%s] " +
  "=> RESPONSE_DATA=[%s], TOKEN=[%s], PRODUCT=[%s]";

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor(context: string = "files") {
    super(context);

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.DailyRotateFile(options.rotateFile),
        new winston.transports.File(options.error),
        new winston.transports.Console(options.console),
      ],
    });
  }

  log(level: string, message: string, ...meta: any[]) {
    this.logger.log(level, message, ...meta);
  }

  info(message: string, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ message, context });
  }

  logFile(dataLog, resData) {
    this.log(
      "info",
      LOG_FILE_TEMPLATE,
      dataLog.method,
      (Date.now() - dataLog.startTime).toLocaleString("vi-VN"),
      dataLog.ip,
      dataLog.username,
      dataLog.originalUrl,
      stringify(dataLog.params),
      stringify(dataLog.query),
      stringify(dataLog.body),
      dataLog.deviceInfo,
      stringify(resData),
      dataLog.token,
      dataLog.product,
    );
  }
}
