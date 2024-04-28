const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is already in use']
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;