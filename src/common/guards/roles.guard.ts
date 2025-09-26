import { ROLES_KEY } from "@common/decorators/role.decorator";
import { Role } from "@common/enum/role.enum";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!requireRoles) return true;

        const { user } = context.switchToHttp().getRequest();
        return requireRoles.some((role) => user.roles?.include(role)); 
    }
}