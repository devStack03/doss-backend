import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from  './users.service';
import UserSchema from './model/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
