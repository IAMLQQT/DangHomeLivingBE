import { HttpException } from "@nestjs/common";

export class DomainError extends HttpException {
  code: number;
  message: string;
  sysMessage: string;
  externalCode?: number;
  externalMessage?: string;
  data: object;

  constructor(
    errorCode: { message: string; sysMessage: string; code: number },
    data: object,
    message?: string,
    status = HttpStatusCode.SERVER,
    externalCode?: number,
    externalMessage?: string,
  ) {
    super(data, status);
    this.code = errorCode.code || 0;
    this.data = data;
    this.message = message || errorCode.message;
    this.sysMessage = errorCode.sysMessage;
    this.externalCode = externalCode;
    this.externalMessage = externalMessage;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class InternalError extends DomainError {
  constructor(
    errorCode: { message: string; sysMessage: string; code: number },
    data: object,
    message?: string,
    status = HttpStatusCode.SERVER,
    externalCode?: number,
    externalMessage?: string,
  ) {
    super(errorCode, data, message, status, externalCode, externalMessage);
  }
}

export class ClientError extends DomainError {
  constructor(
    errorCode: { message: string; sysMessage: string; code: number },
    data: object = {},
    message?: string,
    status = HttpStatusCode.CLIENT,
    externalCode?: number,
    externalMessage?: string,
  ) {
    super(errorCode, data, message, status, externalCode, externalMessage);
  }
}

export const HttpStatusCode = {
  INFO: 100,
  SUCCESS: 200,
  REDIRECT: 300,
  CLIENT: 400,
  SERVER: 500,
};
