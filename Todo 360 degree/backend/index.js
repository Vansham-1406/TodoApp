const express = require("express");
const app = express();
const cors = require("cors");
const Connect_db = require("./db");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

app.use(cors());
app.use(express.json({limit : '50mb'}));

app.use("/user",userRoute);
app.use("/todo",todoRoute);

app.listen(5200,()=>{
    Connect_db();
    console.log("Connected to port http://localhost:5200");
})