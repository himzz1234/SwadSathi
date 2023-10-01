const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isCanteen: {
            type: Boolean,
            required: true,
            default: false
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
                ref: 'canteen',
            }
        ]
    },{
        timestamps: true
    }
);

const User = mongoose.model('user', UserSchema);
module.exports = User;