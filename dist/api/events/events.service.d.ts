import { Model } from 'mongoose';
import { Event } from '../shared/types/event';
import { EventAttend } from '../shared/types/event-attend';
import { UsersService } from '../users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsService {
    private eventModel;
    private eventAttendModel;
    private usersService;
    constructor(eventModel: Model<Event>, eventAttendModel: Model<EventAttend>, usersService: UsersService);
    create(createEventDto: CreateEventDto): Promise<{
        status: number;
        data: Event & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findAll(userId?: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: number): string;
    findByEventId(eventId: string): Promise<Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: number, updateEventDto: UpdateEventDto): string;
    remove(id: number): string;
    countEventAttendByID(userId: string, eventId: string): Promise<number>;
    changeState(eventId: string, userId: string, state: number): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        data: EventAttend & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    cancelAttend(attendId: string, userId: string): Promise<{
        status: number;
        data: EventAttend & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
}
