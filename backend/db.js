const Mongoose = require("mongoose")
require('dotenv').config()
const Connect_db = async() => {
    var mongo = process.env.MONGODB_URI
    try 
    {
        await Mongoose.connect(mongo)
        console.log("Database connected")
    } 
    catch (error) 
    {
        console.log(error.message)
    } 
}

module.exports = Connect_db;