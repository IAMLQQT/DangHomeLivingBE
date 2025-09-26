import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "src/common/logger/logger.module";
import { RedisService } from "./redis.service";

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
