import { ClientError } from "@common/kernel/custom-error";
import ErrorCode from "@common/kernel/error.code";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) { }

    use(req: Request, res: Response, next: NextFunction): void {
        if (req.baseUrl.startsWith("/public")) return next();

        const { product, token } = req.headers;
        const headers = this.configService.get("header");        
        const productHeader = headers.find((h) => h.product === product);
        if (!productHeader || productHeader.token !== token) {
            throw new ClientError(
                ErrorCode.INVALID_TOKEN_ERROR, 
                {},                           
                'Token is invalid'              
            );
        }
        next();
    }
}