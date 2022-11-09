import { Document } from "mongoose";

export interface User extends Document {
    id: string;
    email: string;
    password?: string;
    created?: Date;
    refreshToken?: string;
    emailVerified: boolean;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripeClientSecret: string;
    lastPaymentStatus: string;
    verificationCode: string;
}