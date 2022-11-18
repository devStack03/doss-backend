"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger("Event.schema");
const opts = { toJSON: { virtuals: true } };
const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    eventDate: {
        type: Date,
        default: null
    },
    image: {
        type: String,
        default: ''
    },
    maxAttendees: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        defaut: true
    }
}, opts);
EventSchema.statics.updateEventState = async (count, eventId) => {
};
EventSchema.virtual('id').get(function () {
    return this._id;
});
EventSchema.plugin(timestamp);
exports.default = EventSchema;
//# sourceMappingURL=event.schema.js.map