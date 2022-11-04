import * as mongoose from "mongoose";
declare const CouponSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    createdAt?: Date;
    code?: string;
}>;
export default CouponSchema;
