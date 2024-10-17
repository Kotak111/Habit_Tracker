const nodemailer = require("nodemailer");
const Habit = require("../models/habit.model");
const cron = require('node-cron');
const User = require("../models/user.model");

// Create a mail transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "kotakh311@gmail.com",
        pass: "casv enss rkeh viaw", // Use App Password if 2FA is enabled
    }
});

// Function to send email notification
const sendEmail = async (email, habitName) => {
    console.log(`Preparing to send email to: ${email} for habit: ${habitName}`);

    const mailOptions = {
        from: 'kotakh311@gmail.com',
        to: email,
        subject: 'Habit Reminder',
        text: `Reminder: Don't forget to complete your habit "${habitName}" today!`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
// Schedule a daily notification at 8 AM
const scheduleDailyNotifications = () => {
    cron.schedule('0 8 * * *', async () => {
        console.log('Running daily habit reminder task at 8 AM');

        try {
            // Find all habits with progress less than 100
            const pendingHabits = await Habit.find({ progress: { $lt: 100 } });

            for (const habit of pendingHabits) {
                const user = await User.findById(habit.userId);
                if (user && user.email) {
                    sendEmail(user.email, habit.name);
                } else {
                    console.log(`User not found or email is missing for habit: ${habit.name}`);
                }
            }

        } catch (error) {
            console.error('Error fetching habits for daily reminder:', error);
        }
    });
};
module.exports = scheduleDailyNotifications;
