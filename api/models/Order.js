const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "canteen",
    },
    orderItems: [
      {
        qty: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "item",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "Ready",
        "Pending",
        "Declined",
        "Preparing",
        "Delivered",
        "No Response",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
