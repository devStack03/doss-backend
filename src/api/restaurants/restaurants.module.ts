import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import RestaurantSchema from './model/restaurant.schema';
import { SharedModule } from '../shared/shared.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Restaurant", schema: RestaurantSchema }]),
    SharedModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule { }
