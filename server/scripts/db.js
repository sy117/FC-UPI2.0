const User = require("../models/User")
const RandomNumber = require("../models/RandomNumber");
const BankStatement = require("../models/BankStatement");


async function dummy() {
    console.log("In dummy!");
    try {
        console.log("In try");
        // 
        let data = await User.find();
        console.log("data", data);
        // if (!arr) {
        //     console.log("returned null");
        // }
        // console.log("down");
        // console.log("Res", arr);
    } catch (err) {
        console.log("In catch");
        console.log(err);
    }
}

dummy();

// module.exports = dummy;