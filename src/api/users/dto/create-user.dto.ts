/* eslint-disable max-classes-per-file */
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    // username: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
}