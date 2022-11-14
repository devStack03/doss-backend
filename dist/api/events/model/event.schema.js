"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
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
    }
}, opts);
EventSchema.virtual('id').get(function () {
    return this._id;
});
EventSchema.plugin(timestamp);
exports.default = EventSchema;
//# sourceMappingURL=event.schema.js.map