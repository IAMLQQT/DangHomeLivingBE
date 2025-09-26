import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";
import { LoggerService } from "src/common/logger/logger.service";

@Injectable()
export class RedisService {
  private redis;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    this.redis = createClient({
      url: this.configService.get<string>("cache.redis.uri"),
    })
      .on("connect", () => {
        console.log("Redis Client Connected");
      })
      .on("error", (err) => console.log("Redis Client Error", err));

    this.redis.connect();
  }

  async set(key: string, value: any, ttl: number) {
    const options = ttl > 0 ? { EX: ttl } : {};

    return await this.redis.set(key, JSON.stringify(value), options);
  }

  async get(key: string): Promise<any> {
    try {
      return JSON.parse(await this.redis.get(key));
    } catch (error) {
      this.loggerService.log("error", error.message, error);

      return null;
    }
  }

  async setArray(key: string, array: any[]) {
    await this.redis.lpush(key, ...array);
  }

  async getArray(key: string): Promise<any[]> {
    return this.redis.lrange(key, 0, -1);
  }

  getOtpKey(username: string, isAdminUser: boolean) {
    return `otp:${username}:${isAdminUser}`;
  }

  getAccessTokenKey({
    username,
    isAdminUser,
  }: {
    username: string;
    isAdminUser: boolean;
  }) {
    return `accessToken:${username}:${isAdminUser}`;
  }
}
