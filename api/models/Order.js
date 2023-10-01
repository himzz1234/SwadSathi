const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    canteen: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'canteen'
    },
    orderItems: [
        {
            qty: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'item'
            }
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        status: {
            type: String // Success/Failure
        },
        update_time: {
            type: String
        },
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
},
{
    timestamps: true,
})

const Order = mongoose.model('order', OrderSchema)
module.exports = Order