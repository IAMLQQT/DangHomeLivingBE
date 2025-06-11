import { FindAllResponse } from "@common/types/common.type";
import { UpdateResult } from "mongoose";

export interface BaseRepository<T> {
    create(dto: T | any): Promise<T & T[]>;

    findOne(filter?: object, projection?: object): Promise<T>;

    findAll(filter?: object, options?: object): Promise<FindAllResponse<T>>;
    
    updateOne(filter: object, dto: Partial<T>): Promise<T>;

    updateMany(
        filter: object,
        dto: Partial<T>,
        options?: object,
    ): Promise<UpdateResult>;

    delete(id:string): Promise<boolean>;

    softDelete(id: string): Promise<boolean>;

    aggregate(pipelines: object[]): Promise<any>;
}