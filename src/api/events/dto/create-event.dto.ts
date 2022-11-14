import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  eventDate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  maxAttendees: number;
}
