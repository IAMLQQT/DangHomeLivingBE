import { RedisModule } from "@modules/cache/redis.module";
import { UsersModule } from "@modules/users/users.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoggerModule } from "@common/logger/logger.module";
import { AdminAuthController } from "./admin.auth.controller";
@Module({
    imports: [
        LoggerModule,
        RedisModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    global: true,
                    secret: config.get<string>("security.jwtSecret"),
                    signOptions: {
                        expiresIn: config.get<string | number>("security.jwtExpire")
                    }
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService ,JwtStrategy],
    controllers: [AuthController, AdminAuthController]
})
export class AuthModule {} 