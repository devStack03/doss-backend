import { Document } from "mongoose";
import { Event } from "./event";
import { User } from "./user";

export interface EventAttend extends Document {
  id: string;
  attendee: User;
  event: Event;
  status: number;
}