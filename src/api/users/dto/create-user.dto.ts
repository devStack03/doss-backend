/* eslint-disable max-classes-per-file */
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  // username: string;
  @ApiProperty()
  id: string;
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  invitationCode: string;

  @ApiProperty()
  subscriptionPlan: string;
  
  @ApiProperty()
  subscriptionStart: string;
}

export class UserSignupDTO {

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  invitationCode: string;

  @ApiProperty()
  subscriptionPlan: string;
  
  @ApiProperty()
  subscriptionStart: string;

  stripeCustomerId: string;
}