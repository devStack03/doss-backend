import * as mongoose from "mongoose";
export declare enum OfferType {
    EXPIRED = -1,
    ACTIVATED = 0,
    ENABLED = 1
}
declare const RestaurantSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    name: string;
    description: string;
    image: string;
    available: number;
    expireDate: Date;
    offer: string;
    activatedAt: Date;
    activator?: mongoose.Types.ObjectId;
}>;
export default RestaurantSchema;
