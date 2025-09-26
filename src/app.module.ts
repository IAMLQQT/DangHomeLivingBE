import configuration from '@config/configuration';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '@common/database/mongoose.config.services';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';
import { TokenMiddleware } from '@common/middleware/token.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from '@common/filters/all-exception.filter';
import { LoggerModule } from '@common/logger/logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env' + (process.env.NODE_ENV || "local"),
      load: [configuration]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          port: configService.get<number>('mail.port'),
          secure: false,
          auth: {
            user: configService.get<string>('mail.user'),
            pass: configService.get<string>('mail.pass'),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: {
          from: configService.get<string>('mail.from'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          name: "short",
          ttl: configService.get<number>("throttle.short.ttl") ?? 10,
          limit: configService.get<number>("throttle.short.limit") ?? 10,
        },
        {
          name: "medium",
          ttl: configService.get<number>("throttle.medium.ttl") ?? 10000,
          limit: configService.get<number>("throttle.medium.limit") ?? 20,
        },
        {
          name: "long",
          ttl: configService.get<number>("throttle.long.ttl") ?? 60000,
          limit: configService.get<number>("throttle.long.limit") ?? 100,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ]

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TokenMiddleware).forRoutes('*');
  }
}
