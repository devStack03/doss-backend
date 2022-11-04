import { Module, Global  } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChargeModule } from './charge/charge.module';
import { SharedModule } from './shared/shared.module';

@Global() 
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChargeModule,
    SharedModule
  ],
  providers: [],
  exports: [],
  controllers: []
})
export class ApiModule {}