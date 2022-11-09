export declare class CredentialsDTO {
    phoneNumber: string;
    code: string;
}
export declare class SendLoginCodeDto {
    phoneNumber: string;
}
export declare class EmailDTO {
    email: string;
}
export declare class SignupResponseDTO {
    status: number;
    message: string;
    id: string;
}
export declare class LoginResponseDTO {
    msg: string;
    status: number;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: any;
}
export declare class RefreshTokenDTO {
    status: number;
    refreshToken: string;
    accessToken: string;
}
export declare class TokenDTO {
    userId: string;
    refresh_token: string;
}
