const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true

    },
    ibus: {
        type: Number,
        require: true,
        trim: true

    },
    stock: {
        type: Number,
        require: true,
        default : 0
       },
    type: {
        type: String,
        require: true,
        trim: true
    },
    info: {
        type: String,
        require: true,
        trim: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true
    },
    url: {
        type: String,
        require: true,
        trim: true
    }
})

module.exports = mongoose.model('Beer', BeerSchema);