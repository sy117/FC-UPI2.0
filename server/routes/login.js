const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const $env = process.env;
const User = require("../models/User");
const BankStatement = require("../models/BankStatement");

router.post("/", async (req, res) => {
    
    try {
        //To-Do:- Schema validation for request body
        let { username, password } = req.body;

        // Check if username exist
        let user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "UserName not found!" });
        }
        // Match password
        let hashedPassword = user.password;
        if (!passwordHash.verify(password, hashedPassword)) {
            return res.status(400).json({ message: "Invalid Password!" });
        }
        // Issue token to user
        let token = jwt.sign({ user: user._id }, $env.TOKEN_SECRET);

        // Check for account details
        let accountDetail = await BankStatement.findOne({
            accountNumber: user.accountNumber,
        }).sort({ date: "descending" });
        if (accountDetail) {
            res.json({
                message: "Logged In successfully!",
                token: token,
                accountNumber: user.accountNumber,
                closingBalance: accountDetail["closingBalance"],
            });
        }
        return res.json({
            message: "Account Details not found. Please upload CSV file.",
            token: token,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
