const express = require('express')
const cookiearser=require("cookie-parser")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const port = process.env.PORT 
const UserRoute=require("./Routes/user.route")
const HabitRoute=require("./routes/habit.route")
const AdminHabit=require("./routes/adminhabit.route")
const scheduleReminders = require('./config/mail')
app.use(cookiearser())
require("./config/db")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Habit_Tracker API',
        version: '1.0.0',
        description: 'API for managing Habit_Tracker',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};

// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/habit.route.js' ,  './routes/adminhabit.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth/",UserRoute)
app.use("/api/v1/habit",HabitRoute)
app.use("/api/v1/admin",AdminHabit)
scheduleReminders();
app.get("/",(req,res)=>{
    res.send("<center><h1>Habit_Tracker App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Habit_Tracker target=_blank>Repository :- Habit_Tracker</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))