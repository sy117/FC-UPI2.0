const mongoose = require("mongoose");

const bankStatementSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    month: {
        type: Number
    },
    description: {
        type: String
    },
    withdraw: {
        type: Number
    },
    deposit: {
        type: Number
    },
    closingBalance: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("bankStatements", bankStatementSchema, "bankStatements");