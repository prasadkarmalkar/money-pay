const {Schema, model, default: mongoose} = require('mongoose');

const TransactionSchema = new Schema({
    email:{
        type: String
    },
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
});
module.exports = TransactionSchema;