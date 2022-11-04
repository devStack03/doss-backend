import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import ChargeController from './charge.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [ChargeController],
  providers: [ChargeService]
})
export class ChargeModule {}
