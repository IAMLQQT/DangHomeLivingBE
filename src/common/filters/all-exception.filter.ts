import { LoggerService } from "@common/logger/logger.service";
import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { parseError } from "@src/utils/exception";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly loggerService: LoggerService = new LoggerService();

  catch(exception: any, host: ArgumentsHost) {
    try {
      console.error(exception);

      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const dataLog = request.dataLog || {};
      const error = parseError(exception);

      response.status(error.status).json(error);

      this.loggerService.logFile(dataLog, error);
    } catch (err) {
      console.error(err);
    }

    super.catch(exception, host);
  }
}
