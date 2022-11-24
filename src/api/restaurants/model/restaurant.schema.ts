import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'

export enum OfferType {
  EXPIRED = -1,
  ACTIVATED = 0,
  ENABLED = 1
}

const opts = { toJSON: { virtuals: true } };

const RestaurantSchema = new mongoose.Schema(
  {
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
    available: {
      type: Number,
      default: OfferType.ENABLED //  activated: 0, enabled: 1,  expired: -1
    },
    activatedAt: {
      type: Date,
      default: null
    }
  },
  opts
);

RestaurantSchema.virtual('id').get(function () {
  return this._id;
});

RestaurantSchema.plugin(timestamp);

export default RestaurantSchema;
