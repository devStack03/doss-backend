import { Document } from "mongoose";
import { User } from "./user";

export interface Restaurant extends Document {
  id?: string;
  name: string;
  description: string;
  expireDate: Date;
  offer: string;
  image: string;
  activator?: User;
  available:number;
  activatedAt?: Date;
}