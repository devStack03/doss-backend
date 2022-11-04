import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCouponDto {
  @IsString()
  @ApiProperty()
  code: string;
}
