const mongoose = require("mongoose");

const randomNumberSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    assigned: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("randomNumbers", randomNumberSchema, "randomNumbers");
