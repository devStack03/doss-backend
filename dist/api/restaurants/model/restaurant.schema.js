"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
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
    }
}, opts);
RestaurantSchema.virtual('id').get(function () {
    return this._id;
});
RestaurantSchema.plugin(timestamp);
exports.default = RestaurantSchema;
//# sourceMappingURL=restaurant.schema.js.map