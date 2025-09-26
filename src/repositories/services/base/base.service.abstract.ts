import { BaseEntity } from "@modules/shared/base/base.entity";
import { FindAllResponse } from "@src/common/types/common.type";
import { BaseRepository } from "@src/repositories/base/base.repository.interface";
import { BaseService } from "./base.service.interface";

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseService<T>
{
  constructor(private readonly repository: BaseRepository<T>) {}

  async create(createDto: T | any): Promise<T & T[]> {
    return await this.repository.create(createDto);
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<T>> {
    return await this.repository.findAll(filter, options);
  }
  async findOne(filter: any) {
    return await this.repository.findOne(filter);
  }

  async update(filter: object, update_dto: Partial<T>) {
    return await this.repository.updateOne(filter, update_dto);
  }

  async remove(id: string) {
    return await this.repository.softDelete(id);
  }
}
