/* eslint-disable max-classes-per-file */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

  @ApiProperty()
  stripeCustomerId: string;

  @ApiProperty()
  stripeSubscriptionId: string;

  @ApiProperty()
  stripeClientSecret: string;

  @ApiProperty()
  lastPaymentStatus: string;
}

export class CreateCustomerDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  code: string;
}