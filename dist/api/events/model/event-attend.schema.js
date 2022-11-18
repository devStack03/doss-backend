"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger("EventAttend.schema");
const opts = { toJSON: { virtuals: true } };
const EventAttendSchema = new mongoose.Schema({
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, opts);
EventAttendSchema.pre("save", async function (next) {
    try {
        logger.log("Attend event state change mongoose pre-hook");
        return next();
    }
    catch (err) {
        return next(err);
    }
});
EventAttendSchema.virtual('id').get(function () {
    return this._id;
});
EventAttendSchema.plugin(timestamp);
exports.default = EventAttendSchema;
//# sourceMappingURL=event-attend.schema.js.map