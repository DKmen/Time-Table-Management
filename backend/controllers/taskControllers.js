const taskModel = require("../model/taskModels");
const userModel = require("../model/userModels");

exports.getTask =async (req,res)=>{
    const task = await taskModel.find({user:req.user.id});
    res.status(200).json({
        status:'success',
        data:task
    })
}

exports.addTask =async (req,res,next)=>{
    const newTask = await taskModel.create({...req.body,user:req.user.id});
    res.status(200).json({
        status:'success',
        data:newTask
    })
}

exports.deleteTask=async (req,res,next)=>{
    const deleteTask = await taskModel.findByIdAndDelete({_id:req.params.id});
    if(!deleteTask) return next(new Error("task not found"))

    res.status(200).json({
        status:"success",
        deleteTask
    })
}

exports.modifiedTask = async (req,res,next)=>{
    const modifiedTask = await taskModel.updateOne({_id:req.params.id},{...req.body});
    if(!modifiedTask) return next(new Error("task not found"));

    res.status(200).json({
        status:"success",
        modifiedTask
    })
}