import * as mongoose from "mongoose";
declare const EventAttendSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    status: number;
    attendee: mongoose.Types.ObjectId;
    event: mongoose.Types.ObjectId;
}>;
export default EventAttendSchema;
