import { FindAllResponse } from "@common/types/common.type";

export interface Write<T> {
    create(item: T & any): Promise<T & T[]>;
    update(filter: object, item: Partial<T>): Promise<T>;
    remove(id: string): Promise<boolean>;
}

export interface Read<T> {
    findAll(filter?: object, options?: object): Promise<FindAllResponse<T>>;
    findOne(id: string): Promise<T>;
}

export interface BaseService<T> extends Write<T>, Read<T> {}