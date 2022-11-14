import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SharedModule } from '../shared/shared.module';
import EventSchema from './model/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Event", schema: EventSchema }]),
    SharedModule
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
