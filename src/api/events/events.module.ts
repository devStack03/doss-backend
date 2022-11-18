import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SharedModule } from '../shared/shared.module';
import EventSchema from './model/event.schema';
import { UsersModule } from '../users/users.module';
import EventAttendSchema from './model/event-attend.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Event", schema: EventSchema }, { name: 'EventAttend', schema: EventAttendSchema}]),
    forwardRef(() => UsersModule),
    SharedModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
