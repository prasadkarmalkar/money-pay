const {Schema, model, default: mongoose} = require('mongoose');
const TransactionSchema = require('./TransactionSchema');

const BankSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    balance:{
        type: Number,
        default: 0
    },
    history: [TransactionSchema]
});

const Account = model('account', BankSchema);
module.exports = Account;