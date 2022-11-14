import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  expireDate: Date;
  @ApiProperty()
  offer: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  description: string;
}
