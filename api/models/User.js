const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://speakerhub.com/sites/default/files/user/profile_picture/2023/05/20/morty-harrington.jpg",
    },
    isCanteen: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedCanteens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "canteen",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
