import { Document } from 'mongoose';

export interface Event extends Document {
  id?: string;
  name: string;
  description: string;
  created?: Date;
  updated?: Date;
  eventDate: Date;
  image: string;
  maxAttendees: number;
  available: boolean;
}