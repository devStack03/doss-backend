import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'
const opts = { toJSON: { virtuals: true } };

const UserOfferSchema = new mongoose.Schema(
  {
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
      type: Number, //1 : offered , 0 : canceled
      default: 1
    }
  },
  opts
);

UserOfferSchema.virtual('id').get(function () {
  return this._id;
});

UserOfferSchema.plugin(timestamp);

export default UserOfferSchema;