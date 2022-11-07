import * as mongoose from "mongoose";
declare const CouponSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    code?: string;
    createdAt?: Date;
}>;
export default CouponSchema;
