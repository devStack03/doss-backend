export declare class UserDTO {
    id: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
}
export declare class UserSignupDTO {
    email: string;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripeClientSecret: string;
    lastPaymentStatus: string;
}
export declare class CreateCustomerDto {
    email: string;
    name: string;
    code: string;
    phoneNumber: string;
}
