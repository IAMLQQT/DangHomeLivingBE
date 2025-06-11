import { LoggerModule } from "@common/logger/logger.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { UserService } from "./users.service";
import { UsersRepository } from "@repositories/user.repository";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    providers: [
        UserService,
        {provide: "UsersRepository", useClass: UsersRepository},
    ],
    exports: [UserService, "UsersRepository"],
    controllers: [UsersController],

})
export class UsersModule {}