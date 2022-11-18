"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferType = void 0;
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var OfferType;
(function (OfferType) {
    OfferType[OfferType["EXPIRED"] = -1] = "EXPIRED";
    OfferType[OfferType["ACTIVATED"] = 0] = "ACTIVATED";
    OfferType[OfferType["ENABLED"] = 1] = "ENABLED";
})(OfferType = exports.OfferType || (exports.OfferType = {}));
const opts = { toJSON: { virtuals: true } };
const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    expireDate: {
        type: Date,
        default: null
    },
    image: {
        type: String,
        default: ''
    },
    offer: {
        type: String,
        default: ''
    },
    activator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: Number,
        default: OfferType.ENABLED
    },
    activatedAt: {
        type: Date,
        default: null
    }
}, opts);
RestaurantSchema.virtual('id').get(function () {
    return this._id;
});
RestaurantSchema.plugin(timestamp);
exports.default = RestaurantSchema;
//# sourceMappingURL=restaurant.schema.js.map