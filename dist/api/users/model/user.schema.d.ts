import * as mongoose from "mongoose";
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email: string;
    emailVerified: boolean;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    password?: string;
    refreshToken?: string;
    stripeClientSecret?: string;
    lastPaymentStatus?: string;
}>;
export default UserSchema;
