const express = require("express");
const { authenticateUser } = require("../middleware/userMiddleware");
const Account = require("../schemas/BankSchema");
const router = express.Router();
const zod = require("zod");
const User = require("../schemas/UserSchema");
const mongoose = require("mongoose")
router.get('/balance', authenticateUser, async (req, res) => {
    const myAccount = await Account.findOne({userId:req.userId});
    res.json(myAccount);
})

const transferValidation = zod.object({
    to: zod.string().email(),
    amount: zod.number().min(1, 'Amount cannot be negative'),
    description: zod.string().optional(),
});

// TODO: Need to implement transaction session.
router.post('/transfer',authenticateUser, async(req, res)=>{

    const {to, amount, description} = req.body;
    const { success, error } = transferValidation.safeParse({to, amount, description});
    if ( ! success ) {
        res.status(400).json({message:'Invalid input'});
        return;
    }
    const sendUser = await User.findOne({email:to});
    const currentUser = await User.findById( req.userId );
    if( ! sendUser ) {
        res.status(400).json({message:'Invalid user'});
        return;
    }
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId });

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({ userId: sendUser._id });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }


    const senderHistory = {
        email: sendUser.email,
        amount: -amount,
        description: description, 
    }
    const receiverHistory = {
        email: currentUser.email,
        amount: amount,
        description: description,
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount }, $push: { history: senderHistory } })
    await Account.updateOne({ userId: sendUser._id }, { $inc: { balance: amount }, $push: { history: receiverHistory } })

    res.status(201).json({
        message: "Transfer successful"
    });
})

module.exports = router 