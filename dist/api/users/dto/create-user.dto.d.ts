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
}
