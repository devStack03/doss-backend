import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import RestaurantSchema from './model/restaurant.schema';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import UserOfferSchema from './model/user-offer.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Restaurant", schema: RestaurantSchema },
      { name: "UserOffer", schema: UserOfferSchema },
    ]),
    forwardRef(() => UsersModule),
    SharedModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
