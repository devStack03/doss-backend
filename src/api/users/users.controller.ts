import { Controller, Get, Param, Post, Body, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('')
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params) {
        console.log(params.id);
        return this.userService.findAll();
    }

    /**
     * another way using Param
     */

    async findSecond(@Param('id') id: string) {
        console.log(id);
        return this.userService.findAll();
    }
}

// const mapToDto = (user: User) => {
//     const sanitized = user.toObject();
//     delete sanitized['password'];
//     return sanitized;

// }