import { BaseRepository } from "@repositories/base/base.repository.interface";
import { User } from "../entities/user.entity";

export interface IUserRepository extends BaseRepository<User> {}