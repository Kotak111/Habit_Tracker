const Habit = require("../models/habit.model");
const HabitTemplate = require("../models/habitTemplate.model");
const User = require("../models/user.model");

// Get all users and their habit stats

 exports.GetAlluserStatus =async (req, res) => {
    try {
        const users = await User.find();
        const userStats = await Promise.all(users.map(async (user) => {
            const habits = await Habit.find({ userId: user._id });
            const completedCount = habits.filter(habit => habit.progress >= 100).length;
            return {
                userId: user._id,
                email: user.email,
                completedHabits: completedCount,
                totalHabits: habits.length,
            };
        }));

        res.status(200).json(userStats);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: 'Error fetching user stats' });
    }
}
// Admin create habit template

 exports.HabitAdminCreate=async (req, res) => {
    const { name, frequency, description } = req.body;

    try {
        const newTemplate = new HabitTemplate({ name, frequency, description });
        await newTemplate.save();
        res.status(201).json({ message: 'Habit template created successfully', template: newTemplate });
    } catch (error) {
        console.error('Error creating habit template:', error);
        res.status(500).json({ message: 'Error creating habit template' });
    }
}

// Get all habit templates (optional)

exports.GetHabitTemplete=  async (req, res) => {
    try {
        const templates = await HabitTemplate.find();
        res.status(200).json(templates);
    } catch (error) {
        console.error('Error fetching habit templates:', error);
        res.status(500).json({ message: 'Error fetching habit templates' });
    }
}