const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: ""
        },
        canteenId: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            required: true,
        }

    }
);

const Item = mongoose.model('item', ItemSchema);
module.exports = Item
