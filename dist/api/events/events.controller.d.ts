/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<{
        status: number;
        data: import("../shared/types/event").Event & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findAll(req: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: string): string;
    update(id: string, updateEventDto: UpdateEventDto): string;
    remove(id: string): string;
    changeEventState(id: string, req: any, body: any): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        data: import("../shared/types/event-attend").EventAttend & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    cancelAttendEvent(attendId: string, req: any): Promise<{
        status: number;
        data: import("../shared/types/event-attend").EventAttend & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
}
