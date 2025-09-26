import { BaseEntity } from "@modules/shared/base/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { HydratedDocument, Model } from "mongoose";


@Schema({
    timestamps: true,
    versionKey: false,
})
export class User extends BaseEntity {
    @Prop({required: true, unique: true, index: true})
    id: string;

    @Prop() 
    isAdminUser: boolean; 

    @Prop()
    username: string;

    @Exclude()
    @Prop()
    password: string;

    @Prop() 
    fullname: string;

    @Prop({index: true, unique: true})
    email: string;
    
    @Prop({index: true})
    phone: string;

    @Prop()
    status: string;

    @Prop()
    roles: string[];

    @Prop()
    dob: Date;

    @Prop() 
    gender: string;

    @Prop() 
    identifyCard: string;
    
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({username: 1, isAdminUser: 1}, {unique: true});

export { UserSchema };

export type UserDocument = HydratedDocument<User>;

export type UserModel = Model<User>;
