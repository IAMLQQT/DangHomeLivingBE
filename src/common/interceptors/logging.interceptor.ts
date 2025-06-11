import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dataLog = context.switchToHttp().getRequest().dataLog;

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.log({ dataLog, data });
        },
      }),
    );
  }

  log({ dataLog, data }: any) {
    this.loggerService.logFile(dataLog, data);
  }
}
