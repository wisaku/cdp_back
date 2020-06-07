const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    products: {
        type: Array,
        require: true,
        trim: true

    },
    date: {
        type: Date,
        default: Date.now()

    },
    user: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        default : "Pendiente"
    },
    paid: {
        type: Boolean,
        require: true,
        default: false
    },
    paidRef: {
        type: String,
    },
    price: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    delivery:{
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Order', OrderSchema);