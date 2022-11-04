import * as mongoose from "mongoose";
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email: string;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    emailVerified: boolean;
    password?: string;
    refreshToken?: string;
    stripeCustomerId?: string;
    createdAt?: Date;
}>;
export default UserSchema;
