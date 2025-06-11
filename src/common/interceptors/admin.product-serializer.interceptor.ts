import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AdminProductSerializerInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (Array.isArray(value.docs)) {
          value.docs = value.docs.map((doc: any) => {
            return serializeListView(doc);
          });

          return value;
        } else {
          return serializeDetailView(value);
        }
      }),
    );
  }
}

function serializeListView(doc: any) {
  const data = {
    id: doc.id,
    name: doc.name,
    description: doc.description,
    businessLocationId: doc.businessLocationId,
    warehouseId: doc.warehouseId,
    productGroupName: doc.productGroupName,
    wholesale: [...doc.wholesale.units],
    retail: doc.retail.unit,
    status: doc.status,
    // statusText: doc.status,
  };

  return data;
}

function serializeDetailView(doc: any) {
  delete doc.createdAt;
  delete doc.updatedAt;
  delete doc.deletedAt;

  return doc;
}
