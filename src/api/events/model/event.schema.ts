import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'

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
    }
  },
  opts
);

EventSchema.virtual('id').get(function () {
  return this._id;
});

EventSchema.plugin(timestamp);

export default EventSchema;