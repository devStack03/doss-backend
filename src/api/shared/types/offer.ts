import { Document } from "mongoose";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface UserOffer extends Document {
  id: string;
  user: User;
  restaurant: Restaurant;
  status: number;
}