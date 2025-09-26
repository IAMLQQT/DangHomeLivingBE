import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { Request } from 'express';
import { RedisService } from "@modules/cache/redis.service";

const ACCESS_TOKEN = "accessToken".toLowerCase();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(ACCESS_TOKEN),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("security.jwtSecret"),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(req: Request, payload: any) {
    const cacheKey = this.redisService.getAccessTokenKey(payload);
    const accessToken = await this.redisService.get(cacheKey);

    if(!accessToken || accessToken != req.headers[ACCESS_TOKEN]) return false;
    return payload;
  }
}