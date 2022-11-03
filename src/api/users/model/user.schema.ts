import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
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
    created: { type: Date, default: Date.now },
    refreshToken: {
      type: String
    },
    logs: {
      type: [String],
      default: []
    },
    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  opts
);

// mongoose middlewares1: hashPasswordIfModified
UserSchema.pre("save", async function (next) {
  // DO NOT USE ARROW FUNCTION or this pre-hook won't work as arrow functions use lexical scope for 'this'.
  try {
    logger.log("hashPasswordIfModified mongoose pre-hook");
    if (!this.isModified("password")) {
      return next();
    }

    const hashed = await bcrypt.hash(this["password"], 10);

    this["password"] = hashed;
    // this['passwordUpdate'] = Date.now();
    return next();
  } catch (err) {
    return next(err);
  }
});
UserSchema.virtual('id').get(function () {
  return this._id;
});

export default UserSchema;