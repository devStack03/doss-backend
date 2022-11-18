import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'
import { Logger } from "@nestjs/common";

const logger = new Logger("Event.schema");

const opts = { toJSON: { virtuals: true } };

const EventSchema = new mongoose.Schema(
  {
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
  },
  opts
);

EventSchema.statics.updateEventState = async (count: number, eventId: string) => {
  
}

EventSchema.virtual('id').get(function () {
  return this._id;
});

EventSchema.plugin(timestamp);

export default EventSchema;