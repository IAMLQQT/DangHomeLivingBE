import ErrorCode from "../common/kernel/error.code";
import { getErrorMessage } from "./serialization";

export function parseError(error: any) {
  if (error.status === 400 && error.message === "Bad Request Exception") {
    const errorMessage = error.response?.message;
    error = {
      ...ErrorCode.INVALID_PARAMS_ERROR,
      data: Array.isArray(errorMessage) ? errorMessage.join(",") : errorMessage,
    };
  }

  if (error.name === "MongoServerError") {
    if (error.code === 11000) {
      error = {
        ...ErrorCode.DATA_EXIST_ERROR,
        data: { message: error.message },
      };
    } else {
      error = {
        ...ErrorCode.DB_SYSTEM_ERROR,
        data: getErrorMessage(error.response?.message),
      };
    }
  }

  if (
    error?.status === 429 &&
    error.message === "ThrottlerException: Too Many Requests"
  ) {
    error = ErrorCode.RATE_LIMIT_ERROR;
  }

  if (!error.code || isNaN(error.code) || error.code > ErrorCode.SUCCESS.code)
    error = {
      ...ErrorCode.SYSTEM_ERROR,
      data: { exResponse: error?.response || {} },
    };

  return error;
}
