const express = require("express");
const route = express.Router();
const userData = require("../controller/userData");

route.post("/register",userData.userRegister);
route.post("/login",userData.userLogin);
route.post("/mail",userData.mail);

module.exports = route;