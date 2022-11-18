import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'
import { Logger } from "@nestjs/common";

const logger = new Logger("EventAttend.schema");
const opts = { toJSON: { virtuals: true } };

const EventAttendSchema = new mongoose.Schema(
  {
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
      type: Number, //  -1: cancelled, 0: assist, 1: confirmed
      required: true
    }
  },
  opts
);
EventAttendSchema.pre("save", async function (next) {
  // DO NOT USE ARROW FUNCTION or this pre-hook won't work as arrow functions use lexical scope for 'this'.
  try {
    logger.log("Attend event state change mongoose pre-hook");
    
    // this['passwordUpdate'] = Date.now();
    return next();
  } catch (err) {
    return next(err);
  }
});
EventAttendSchema.virtual('id').get(function () {
  return this._id;
});

EventAttendSchema.plugin(timestamp);

export default EventAttendSchema;