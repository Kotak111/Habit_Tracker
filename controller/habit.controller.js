const scheduleDailyNotifications = require("../config/mail");
const Habit = require("../models/habit.model");

//create habit 
exports.CreateHabit=async (req,res)=>{
    try {
        const {name,frequency,streak,progress} = req.body;
        if(name =="" || frequency== "" || streak=="" || progress==""){
            return res.status(400).json({
                success:false,
                message:"fields are required"
            })
        }
    
        const habitadd = new Habit({
            userId:req.user.id,
            name,
            frequency,
            streak,
            progress
        })
        await habitadd.save();
        if(habitadd){
        return res.status(200).json({
            success:true,
            message:"Habit Added"
        })
    }
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Intenal server error"
        })
    }
}

// get all habit 
exports.GetAllHabit= async (req,res)=>{
    try {
        const find=await Habit.find().populate("userId").exec();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No date found"
            })
        }
        return res.status(200).json({
            success:true,
            Habit:find
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Intenal server error"
        })
    }
}

//get by id 
exports.GetById = async(req,res)=>{
    try {
        const find=await Habit.findById(req.params.id).populate("userId").exec();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No date found"
            })
        }
        return res.status(200).json({
            success:true,
            Habit:find
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Intenal server error"
        })
    }
}

//delete habit 
exports.DeleteHabit = async(req,res)=>{
    try {
        const find=await Habit.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No date found"
            })
        }
        return res.status(200).json({
            success:true,
           message:"Habit deleted"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Intenal server error"
        })
    }
}

//update habit 
exports.UpdateHabit = async (req,res)=>{
    try {
        const user= await Habit.findByIdAndUpdate(req.params.id , req.body ,  {new:true})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No Habit found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Habit Updated"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Intenal server error"
        })
    }
}


// Test endpoint to send a test email
exports.SendMail=  async (req, res) => {
    const { email, habitName } = req.body;

    if (!email || !habitName) {
        return res.status(400).json({ message: 'Email and habit name are required' });
    }

    try {
        await scheduleDailyNotifications(email, habitName);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
    }
}