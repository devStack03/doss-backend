import * as mongoose from "mongoose";
import * as timestamp from 'mongoose-timestamp'

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
    }
  },
  opts
);

RestaurantSchema.virtual('id').get(function () {
  return this._id;
});

RestaurantSchema.plugin(timestamp);

export default RestaurantSchema;