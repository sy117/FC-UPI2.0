const express = require("express");
const routes = express();

const loginRoute = require("./login");
const registerRoute = require("./register");
const fileUploadRoute = require("./fileUpload");


routes.use("/login", loginRoute);
routes.use("/register", registerRoute);
routes.use("/fileupload", fileUploadRoute);


module.exports = routes;