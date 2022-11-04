"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    createdAt: { type: Date, default: Date.now },
});
exports.default = CouponSchema;
//# sourceMappingURL=coupon.schema.js.map