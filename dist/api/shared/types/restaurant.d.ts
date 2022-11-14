import { Document } from "mongoose";
export interface Restaurant extends Document {
    id: string;
    name: string;
    description: string;
    expireDate: Date;
    offer: string;
    image: string;
}
