import { Module, Global  } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Global() 
@Module({
  imports: [
    AuthModule,
    UsersModule
  ],
  providers: [],
  exports: [],
  controllers: []
})
export class ApiModule {}