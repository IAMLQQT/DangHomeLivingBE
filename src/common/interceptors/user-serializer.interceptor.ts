import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UserSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (Array.isArray(value.docs)) {
          value.docs.forEach((doc: any) => {
            serialize(doc);
          });

          return value;
        } else {
          return serialize(value);
        }
      }),
    );
  }
}

function serialize(doc: any) {
  delete doc.password;

  return doc;
}
