const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
require("dotenv/config");
const $env = process.env;
const port = $env.PORT || 5050
const routes = require("./routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload({
    limits: {
        fileSize: 100 * 1024 * 1024, // Max file size = 100MB
    }
}))
app.use("/api", routes);


// Route to check connection..
app.get("/", (req, res) => {
    res.json({
        message: "Sucessfully reached UPI Backend API !!"
    });
});

// Connect to DB
mongoose.connect(
    $env.DB_URL,
    { useNewUrlParser: true,  useUnifiedTopology: true },
    (err) => {
        if(err){
            console.log(`Can't connect to Database :: ${err}`);
            return;
        }
        console.log("Connected to DB!!!");
    }
);

// Start listing on given port
app.listen(port, () =>{
    console.log(`Pseudo Server running on port:: ${port}`);
});