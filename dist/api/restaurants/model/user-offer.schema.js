"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const opts = { toJSON: { virtuals: true } };
const UserOfferSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
}, opts);
UserOfferSchema.virtual('id').get(function () {
    return this._id;
});
UserOfferSchema.plugin(timestamp);
exports.default = UserOfferSchema;
//# sourceMappingURL=user-offer.schema.js.map