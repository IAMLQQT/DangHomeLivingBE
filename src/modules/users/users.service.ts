import { Inject, Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "@repositories/services/base/base.service.abstract";
import { User } from "./entities/user.entity";
import { UsersRepository } from "@repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { ClientError } from "@common/kernel/custom-error";
import ErrorCode from "@common/kernel/error.code";
import { FilterQuery } from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
    constructor(
        @Inject("UsersRepository")
        private readonly usersRepository: UsersRepository,
    ) {
        super(usersRepository);
    }

    async create(createUserDto: CreateUserDto): Promise<User & User[]> {
        const exisUser = await this.usersRepository.findOne({
            username: createUserDto.username,
            isAdminUser: createUserDto.isAdminUser,
        });
        if (exisUser)
            throw new ClientError(
                ErrorCode.DATA_EXIST_ERROR,
                { username: createUserDto.username },
                'User already exists');

        const user = await this.usersRepository.create(createUserDto);
        return user;
    }

    async findOne(query: FilterQuery<User>): Promise<User> {
        const user = await this.usersRepository.findOne(query);

        delete user?._id;
        return user;
    }
    async updateOne(
        filter: FilterQuery<User>,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const user = await this.usersRepository.updateOne(filter, updateUserDto);

        return user;
    }

}