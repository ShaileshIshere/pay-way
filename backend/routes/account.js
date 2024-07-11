const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose} = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try{
        // console.log(`Fetching balance for userID: ${req.userID}`);
        const account = await Account.findOne({
            userID: req.userID
        });
        // console.log("Account found:", account);
        if(!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
    
        res.json({
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({
            message: "error retrieving balance"
        });
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userID: req.userID }).session(session);
    // console.log(account);
    // Check Sender's Balance
    if (account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    else if(!account) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid recipient"
        })
    }

    // Fetch the Recipient's Account
    const toAccount = await Account.findOne({ userID: to }).session(session);
    // Check Recipient's Account Existence
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userID: req.userID }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userID: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;