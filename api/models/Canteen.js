const mongoose = require('mongoose');
const {Schema} = mongoose;

const CanteenSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        workingStatus: {
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
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }
    }
);

const Canteen = mongoose.model('canteen', CanteenSchema);
module.exports = Canteen;