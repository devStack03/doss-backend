import * as mongoose from "mongoose";
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email: string;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    emailVerified: boolean;
    password?: string;
    stripeClientSecret?: string;
    lastPaymentStatus?: string;
    refreshToken?: string;
}>;
export default UserSchema;
