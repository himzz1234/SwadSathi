const mongoose = require('mongoose');
const {Schema} = mongoose;

const CanteenSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: ""
        },
        isCanteen: {
            type: Boolean,
            required: true,
            default: true
        },
        address: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        isOpen: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: '',
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        menu: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'item'
            }
        ],
    }
);

const Canteen = mongoose.model('canteen', CanteenSchema);
module.exports = Canteen;