const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 5;
        },
        message: (props) =>
          `${props.path} should be between 1 and 5, got '${props.value}'`,
      },
    },
    comment: {
      type: String,
      required: true,
      minlength: [1, "The message length should be > 0"],
      maxlength: [120, "The message length should be <= 120"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
