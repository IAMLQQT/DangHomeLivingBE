import { FindAllResponse } from "@common/types/common.type";
import { BaseEntity } from "@modules/shared/base/base.entity";
import { toJSON } from "@src/utils/serialization";
import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
  UpdateResult,
} from "mongoose";
import { BaseRepository } from "./base.repository.interface";

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
  implements BaseRepository<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | T[] | any): Promise<T & T[]> {
    const data = await this.model.create(dto);

    if (Array.isArray(data)) {
      return data.map((item) => toJSON(item)) as T & T[];
    }

    return toJSON(data) as unknown as T & T[];
  }

  async findOne(filter = {}): Promise<T> {
    return (await this.model
      .findOne({ ...filter, deletedAt: null }, { _id: 0 })
      .lean()) as T;
  }

  async findAll(
    filter: FilterQuery<T>,
    options: QueryOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const { page, limit } = options;
    const skip = (page - 1) * ( limit ?? 10);

    const [total, docs] = await Promise.all([
      this.model.countDocuments({ ...filter, deletedAt: null }),
      this.model
        .find(
          { ...filter, deletedAt: null },
          { ...Object(options?.projection), _id: 0 },
          { ...options, skip, lean: true },
        )
        .lean(),
    ]);

    return {
      total,
      docs: docs.map((doc) => toJSON(doc)),
    };
  }

  async updateOne(
    filter: UpdateQuery<T>,
    dto: Partial<T>,
    options = {
      versionKey: false,
      new: true,
      lean: true,
      projection: { _id: 0 },
    },
  ): Promise<T> {
    return (await this.model.findOneAndUpdate(
      { ...filter, deletedAt: null },
      dto,
      options,
    )) as T;
  }

  async updateMany(
    filter: UpdateQuery<T>,
    dto: Partial<T>,
    options?: object,
  ): Promise<UpdateResult> {
    return await this.model.updateMany({ ...filter, deletedAt: null }, dto, {
      versionKey: false,
      lean: true,
      ...options,
    });
  }

  async softDelete(id: string): Promise<boolean> {
    const deletedDoc = await this.model.findOne({ id });

    if (!deletedDoc) return false;

    return !!(await this.model.findOneAndUpdate<T>(
      { id },
      {
        deletedAt: new Date(),
      },
    ));
  }

  async delete(id: string): Promise<boolean> {
    const deletedDoc = await this.model.findById(id);

    if (!deletedDoc) return false;

    return !!(await this.model.findByIdAndDelete(id));
  }

  async aggregate(pipelines: any): Promise<any> {
    return await this.model.aggregate(pipelines);
  }
}
