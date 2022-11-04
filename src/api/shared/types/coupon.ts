import { Document } from "mongoose";

export interface Coupon extends Document {
    id: string;
    code: string;
}