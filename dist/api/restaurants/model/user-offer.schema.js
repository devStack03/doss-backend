"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const opts = { toJSON: { virtuals: true } };
const UserOfferSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    }
}, opts);
UserOfferSchema.virtual('id').get(function () {
    return this._id;
});
UserOfferSchema.plugin(timestamp);
exports.default = UserOfferSchema;
//# sourceMappingURL=user-offer.schema.js.map