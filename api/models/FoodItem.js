const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodItemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        canteenId: {
            type: String,
            required: true
        },
        itemImage: {
            type: String,
            required: true,
        },
        itemPrice: {
            type: Number,
            required: true,
        },
        availability: {
            type: Boolean,
            required: true,
        }

    }
);

const Fooditem = mongoose.model('fooditem', FoodItemSchema);
module.exports = Fooditem
