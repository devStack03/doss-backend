import { Module, Global  } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChargeModule } from './charge/charge.module';
import { SharedModule } from './shared/shared.module';
import { CouponModule } from './coupon/coupon.module';
import { EventsModule } from './events/events.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import SeedModule from './shared/seeds/seed.module';

@Global() 
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChargeModule,
    SharedModule,
    CouponModule,
    SeedModule,
    EventsModule,
    RestaurantsModule
  ],
  providers: [],
  exports: [],
  controllers: []
})
export class ApiModule {}