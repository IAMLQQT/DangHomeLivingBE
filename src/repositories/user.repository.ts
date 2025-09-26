import { User, UserModel } from "@modules/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserRepository } from "@src/modules/users/interfaces/user.repository.interface";
import { BaseRepositoryAbstract } from "@src/repositories/base/base.repository.abstract";

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<User>
  implements IUserRepository
{
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: UserModel,
  ) {
    super(usersRepository);
  }
}
