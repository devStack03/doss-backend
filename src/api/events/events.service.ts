import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../shared/types/event';
import { EventAttend } from '../shared/types/event-attend';
import { UsersService } from '../users/users.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private eventModel: Model<Event>,
    @InjectModel('EventAttend') private eventAttendModel: Model<EventAttend>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }
  async create(createEventDto: CreateEventDto) {
    const res = await this.eventModel.create(createEventDto);
    return { status: 1, data: res, message: 'success' }
  }

  async findAll(userId = null) {
    const allEvents = await this.eventModel.find().sort({ available: -1 }).lean().exec();
    let temp = [];
    for (let e of allEvents) {
      const eventAttends = await this.eventAttendModel.find({ event: e._id, attendee: userId });
      const t = {
        ...e,
        id: e._id,
        attendId: eventAttends.length ? eventAttends[0]._id : '',
        attended: eventAttends.length ? eventAttends[0].status : 0
      };
      temp.push(t);
    }
    return {
      status: 1,
      data: temp,
      message: 'success'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async findByEventId(eventId: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) throw new BadRequestException('Event Not found');
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async countEventAttendByID(userId: string, eventId: string) {
    const eventAttend = await this.eventAttendModel.find({
      event: eventId
    });
    return eventAttend.length;
  }
  async changeState(eventId: string, userId: string, state: number) {
    const user = await this.usersService.findByUserId(userId);
    const event = await this.findByEventId(eventId);

    const newEventAttend = new this.eventAttendModel({
      event,
      attendee: user,
      status: state
    });

    const eventAttend = await newEventAttend.save();
    if (state === 1) {
      const count = await this.countEventAttendByID(userId, eventId);
      if (count < event.maxAttendees - 1) {

      }
      else if (count === event.maxAttendees - 1) {
        event.available = false;
      } else {
        return { status: 0, message: 'you can not attend' };
      }
    }
    return {
      status: 1,
      data: eventAttend,
      message: 'success'
    }
  }

  async cancelAttend(attendId: string , userId: string) {
    const attend = await this.eventAttendModel.findById(attendId);
    if (!attend) throw new BadRequestException('Not found');

    attend.status = -1;
    await attend.save();

    return {
      status: 1,
      data: attend,
      message: 'success'
    };

  }
}
