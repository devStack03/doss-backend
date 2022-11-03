/* eslint-disable max-classes-per-file */
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OmitType } from "@nestjs/swagger";

export class ErrorResponseDTO {

  @IsNotEmpty()
  @ApiProperty()
  statusCode: number;

  @IsNotEmpty()
  @ApiProperty()
  error: string;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: number;
}



