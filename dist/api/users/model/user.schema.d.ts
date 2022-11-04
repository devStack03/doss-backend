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
    createdAt?: Date;
    stripeCustomerId?: string;
}>;
export default UserSchema;
