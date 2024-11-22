const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  canteenId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  classification: {
    type: String,
    enum: ["Veg, Non-Veg"],
    required: true,
  },
});

module.exports = mongoose.model("item", ItemSchema);
