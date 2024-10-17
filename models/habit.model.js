const { Schema, model, default: mongoose } = require("mongoose");

const habitSchema=new Schema({
    userId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    name:{
        type:String,
        required:true
    },
    frequency:{
        type:String,
        enum: ['daily', 'weekly', 'monthly'],
        required:true
    },
    streak:{
        type:Number,
        default:0
    },
    progress:{
        type:Number,
        required:true
    },
    lastUpdated:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const Habit= model("Habit",habitSchema)
module.exports=Habit;