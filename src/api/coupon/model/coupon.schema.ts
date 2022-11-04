import * as mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,

    },
    createdAt: { type: Date, default: Date.now },
  }
);

export default CouponSchema;