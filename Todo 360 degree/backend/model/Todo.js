const mongoose = require("mongoose");

const Todo = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    done : {
        type : Boolean,
        default : false
    },
    email : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("todo",Todo);