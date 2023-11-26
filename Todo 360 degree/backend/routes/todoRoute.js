const express = require("express");
const route = express.Router();
const todoData = require("../controller/todoData")

route.post("/add",todoData.addTodo);
route.post("/get",todoData.getTodo);
route.put("/undo",todoData.undoTodo);
route.put("/update",todoData.update);
route.delete("/del/:id",todoData.delete);

module.exports = route;