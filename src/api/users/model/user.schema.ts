import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'
import { Logger } from "@nestjs/common";

const logger = new Logger("User.schema");
const opts = { toJSON: { virtuals: true } };
const UserSchema = new mongoose.Schema(
  {
    // username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },

    password: {
      type: String,
      required: false, // pre validation
      select: false,
      minlength: 5,
      maxlength: 255,
    },
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
      default: null
    },
    stripeSubscriptionId: {
      type: String,
      default: null
    },
    stripeClientSecret: {
      type: String,
    },

    lastPaymentStatus: {
      type: String,
    }
  },
  opts
);

// mongoose middlewares1: hashPasswordIfModified
// UserSchema.pre("save", async function (next) {
//   // DO NOT USE ARROW FUNCTION or this pre-hook won't work as arrow functions use lexical scope for 'this'.
//   try {
//     logger.log("hashPasswordIfModified mongoose pre-hook");
//     if (!this.isModified("password")) {
//       return next();
//     }

//     const hashed = await bcrypt.hash(this["password"], 10);

//     this["password"] = hashed;
//     // this['passwordUpdate'] = Date.now();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.plugin(timestamp)

export default UserSchema;