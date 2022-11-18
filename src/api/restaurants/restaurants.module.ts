import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import RestaurantSchema from './model/restaurant.schema';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Restaurant", schema: RestaurantSchema }]),
    forwardRef(() => UsersModule),
    SharedModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
