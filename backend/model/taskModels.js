const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String,
    },
    descripatation:{
        type:String,
    },
    date:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'user',
        required:true,
    }
})

taskSchema.methods.check= function(){
    console.log('saaa')
}

const taskModel = mongoose.model('task',taskSchema);

module.exports = taskModel;