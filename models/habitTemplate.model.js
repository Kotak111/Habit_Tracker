const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const habitTemplateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: true
    },
    description: {
        type: String,
        required: false
    },
}, { timestamps: true });

const HabitTemplate = model('HabitTemplate', habitTemplateSchema);
module.exports = HabitTemplate;
