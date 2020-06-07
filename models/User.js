const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true

    },

    email: {
        type: String,
        require: true,
        trim: true

    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        trim: true

    },

    address: {
        type: String,
        require: false
    },
    role: {
        type: String,
        require: false,
        trim: true
    },
})

module.exports = mongoose.model('User', UserSchema);