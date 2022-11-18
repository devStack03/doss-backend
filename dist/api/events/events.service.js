"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let EventsService = class EventsService {
    constructor(eventModel, eventAttendModel, usersService) {
        this.eventModel = eventModel;
        this.eventAttendModel = eventAttendModel;
        this.usersService = usersService;
    }
    async create(createEventDto) {
        const res = await this.eventModel.create(createEventDto);
        return { status: 1, data: res, message: 'success' };
    }
    async findAll(userId = null) {
        const allEvents = await this.eventModel.find().sort({ available: -1 }).lean().exec();
        let temp = [];
        for (let e of allEvents) {
            const eventAttends = await this.eventAttendModel.find({ event: e._id, attendee: userId });
            const t = Object.assign(Object.assign({}, e), { id: e._id, attendId: eventAttends.length ? eventAttends[0]._id : '', attended: eventAttends.length ? eventAttends[0].status : 0 });
            temp.push(t);
        }
        return {
            status: 1,
            data: temp,
            message: 'success'
        };
    }
    findOne(id) {
        return `This action returns a #${id} event`;
    }
    async findByEventId(eventId) {
        const event = await this.eventModel.findById(eventId);
        if (!event)
            throw new common_1.BadRequestException('Event Not found');
        return event;
    }
    update(id, updateEventDto) {
        return `This action updates a #${id} event`;
    }
    remove(id) {
        return `This action removes a #${id} event`;
    }
    async countEventAttendByID(userId, eventId) {
        const eventAttend = await this.eventAttendModel.find({
            event: eventId
        });
        return eventAttend.length;
    }
    async changeState(eventId, userId, state) {
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
            }
            else {
                return { status: 0, message: 'you can not attend' };
            }
        }
        return {
            status: 1,
            data: eventAttend,
            message: 'success'
        };
    }
    async cancelAttend(attendId, userId) {
        const attend = await this.eventAttendModel.findById(attendId);
        if (!attend)
            throw new common_1.BadRequestException('Not found');
        attend.status = -1;
        await attend.save();
        return {
            status: 1,
            data: attend,
            message: 'success'
        };
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Event')),
    __param(1, (0, mongoose_1.InjectModel)('EventAttend')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map