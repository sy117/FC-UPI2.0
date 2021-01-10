const express = require("express");
const router = express.Router();
var passwordHash = require("password-hash");
const $env = process.env;
const User = require("../models/User");
const RandomNumber = require("../models/RandomNumber");

router.post("/", async (req, res) => {
    
    try {
        //To-Do:- Schema validation for request body
        let { name, username, password } = req.body;
        // Check for already existing user
        let userExist = await User.findOne({ username: username });
        console.log("User:", userExist);
        if (userExist) {
            return res.status(400).json({ message: "UserName already exists!" });
        }
        // Generate Account Number assuming collection has sufficient supply 
        let randomNumberObj = await RandomNumber.findOne({ assigned: false });
        let accountNumber = randomNumberObj? randomNumberObj.number : $env.ACCOUNT_NUMBER;

        // Hash Password
        let hashedPassword = passwordHash.generate(password);

        // Add user into DB
        let user = new User({
            name,
            username,
            password: hashedPassword,
            accountNumber: accountNumber,
        });
        let savedStatus = await Promise.all([
            RandomNumber.findByIdAndUpdate({ _id: randomNumberObj._id }, { assigned: true }),
            user.save(),
        ]);
        return res.json({
            name: name,
            username: username,
            accountNumber: accountNumber,
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
