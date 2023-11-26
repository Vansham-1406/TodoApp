const Todo = require("../model/Todo");
const User = require("../model/User");

exports.addTodo = async (req,res) => {
    try 
    {
        const {name,email} = req.body;
        await Todo.create({name,email});
        return res.status(200).json({ status : true });
    } 
    catch (error) 
    {
        return res.status(400).json({ msg: error.message });
    }
}

exports.getTodo = async (req,res) => {
    try 
    {
        const {email} = req.body;
        const allTodo = await Todo.find({email});
        return res.status(200).json({ status : true,todo : allTodo });
    } 
    catch (error) 
    {
        return res.status(400).json({ msg: error.message });
    }
}

exports.undoTodo = async (req,res) => {
    try 
    {
        const {_id} = req.body;
        const todo = await Todo.findById({_id});
        if(todo.done === true)
        {
            await Todo.findByIdAndUpdate({_id},{done : false});
            return res.status(200).json({ status : true });
        }
        else
        {
            await Todo.findByIdAndUpdate({_id},{done : true});
            return res.status(200).json({ status : true });
        }
    } 
    catch (error) 
    {
        return res.status(400).json({ msg: error.message });
    }
}

exports.delete = async (req,res) => {
    try 
    {
        const {id} = req.params;
        await Todo.findByIdAndDelete({_id : id});
        return res.status(200).json({ status : true });
    } 
    catch (error) 
    {
        return res.status(400).json({ msg: error.message });
    }
}

exports.update = async (req,res) => {
    try 
    {
        const {_id,name} = req.body;
        await Todo.findByIdAndUpdate({_id},{name});
        return res.status(200).json({ status : true });
    } 
    catch (error) 
    {
        return res.status(400).json({ msg: error.message });
    }
}