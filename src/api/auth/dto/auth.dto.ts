/* eslint-disable max-classes-per-file */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CredentialsDTO {
    // username: string;
    @IsEmail()
    @ApiProperty()
    phoneNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    code: string;
}


export class SendLoginCodeDto {
  @IsString()
  @ApiProperty()
  phoneNumber: string;
}

export class EmailDTO {
  // username: string;
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class SignupResponseDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  id: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  msg: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  token_type: string;
  @ApiProperty()
  expires_in: number;
  @ApiProperty()
  user: any;
}

export class RefreshTokenDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  accessToken: string;
}

export class TokenDTO {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  refresh_token: string;
}