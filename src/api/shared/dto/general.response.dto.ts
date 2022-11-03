import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GeneralResponseDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
}