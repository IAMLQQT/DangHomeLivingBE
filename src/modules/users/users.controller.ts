import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { generateId } from "@src/utils/generator";

@Controller("app/users")
export class UsersController {
    constructor(private readonly usersService: UserService) {}
     @Post()
        create(@Body() createUserDto: CreateUserDto) {
            createUserDto.id = generateId();
            createUserDto.email = createUserDto.username;
            createUserDto.isAdminUser = false;

            return this.usersService.create(createUserDto);
        }
}