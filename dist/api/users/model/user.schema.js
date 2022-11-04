"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger("User.schema");
const opts = { toJSON: { virtuals: true } };
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255,
    },
    password: {
        type: String,
        required: false,
        select: false,
        minlength: 5,
        maxlength: 255,
    },
    createdAt: { type: Date, default: Date.now },
    refreshToken: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    invitationCode: {
        type: String,
        required: true
    },
    subscriptionPlan: {
        type: String,
        required: true
    },
    subscriptionStart: {
        type: String,
        required: true
    },
    stripeCustomerId: {
        type: String,
    }
}, opts);
UserSchema.virtual('id').get(function () {
    return this._id;
});
exports.default = UserSchema;
//# sourceMappingURL=user.schema.js.map