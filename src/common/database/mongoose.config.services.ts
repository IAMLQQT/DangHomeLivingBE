import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Connection } from "mongoose";
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions {

        console.log(this.configService.get<string>('database.mongo.uri'))
        return {
            uri: this.configService.get<string>('database.mongo.uri'),
            onConnectionCreate(connection: Connection) {
                connection.on("connected", () => console.log("MongoDB connected to"));
                connection.on("open", () => console.log("MongoDB open"));
                connection.on("disconnected", () =>
                    console.log("MongoDB disconnected"),
                );
                connection.on("reconnected", () => console.log("MongoDB reconnected"));
                connection.on("disconnecting", () =>
                    console.log("MongoDB disconnecting"),
                );
            },
        }
    }
}