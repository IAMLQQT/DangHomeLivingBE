import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { ClientError } from "@common/kernel/custom-error";
import ErrorCode from "@common/kernel/error.code";
@Injectable()
export class JwtAuthGuard extends AuthGuard("ywt") {
    constructor(private reflector : Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) return true;

        return super.canActivate(context)
    }
    
    handleRequest(err, user, info) {
        if(err) {
            throw new ClientError(ErrorCode.SYSTEM_ERROR, info);
        }

        if(!user) {
            throw new ClientError(ErrorCode.SESSION_TIMEOUT, {}, "Đăng nhập hết hạn");
        }

        return user
    }
}   