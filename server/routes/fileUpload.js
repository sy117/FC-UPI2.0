const express = require("express");
const router = express.Router();
const csv = require("csv");
const $env = process.env;
const verifyToken = require("../middlewares/verifyAuth");
const User = require("../models/User");
const BankStatement = require("../models/BankStatement");

let getAccountDetails = (monthlyBalances) => {
    let total = 0,
        closingBalance = 0,
        lastMonth = -1;
    for (let i = 0; i < monthlyBalances.length; i++) {
        currMonth = monthlyBalances[i]["_id"];
        currBalance = currMonth > 0 ? monthlyBalances[i]["balance"] : 0;
        total += currBalance;
        if (currMonth > lastMonth) {
            lastMonth = currMonth;
            closingBalance = currBalance;
        }
    }
    let avgMonthlyBalance = total / 12;
    let creditLimit = avgMonthlyBalance * 1.2;
    return {
        creditLimit: creditLimit,
        closingBalance: closingBalance,
    };
};

// Protected Route
router.post("/", verifyToken, async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        let userAccount = await User.findById({ _id: req.user.user });
        userAccount = userAccount
            ? userAccount["accountNumber"]
            : $env.ACCOUNT_NUMBER;
        csv.parse(
            req.files["csv-file"].data.toString(),
            { autoParse: true, columns: true },
            async (error, rows) => {
                if (error) {
                    console.log("Parsing err");
                    res.status(400).json({ message: error });
                }
                let docs = rows.map((row) => {
                    return {
                        accountNumber: userAccount,
                        date: row.Date,
                        month:
                            new Date(row.Date).getMonth() >= 0
                                ? new Date(row.Date).getMonth() + 1
                                : -1,
                        description: row.Description,
                        withdraw: row.Withdraw ? parseFloat(row.Withdraw) : 0,
                        deposit: row.Deposit ? parseFloat(row.Deposit) : 0,
                        closingBalance: row["Closing Balance"]
                            ? parseFloat(row["Closing Balance"])
                            : 0,
                    };
                });
                let insertStatus = await BankStatement.insertMany(docs);
                let queryResults = await BankStatement.aggregate([
                    {
                        $match: {
                            accountNumber: userAccount,
                        },
                    },
                    {
                        $group: {
                            _id: "$month",
                            balance: { $last: "$closingBalance" },
                        },
                    },
                ]);
                let accountDetails = getAccountDetails(queryResults);
                res.json({
                    accountNumber: userAccount,
                    closingBalance: accountDetails.closingBalance,
                    creditLimit: accountDetails.creditLimit,
                });
            }
        );
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
