import * as mongoose from "mongoose";
declare const RestaurantSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    name: string;
    description: string;
    image: string;
    expireDate: Date;
    offer: string;
}>;
export default RestaurantSchema;
