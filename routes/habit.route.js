const HabitController=require("../controller/habit.controller");
const { auth, IsUser } = require("../utils/auth");

const router=require("express").Router();


/**
 * @swagger
 * /api/addhabit:
 *   post:
 *     summary: Create a new habit
 *     description: Allows a user to create a new habit.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Bad request
 */
router.post('/addhabit', auth, IsUser, HabitController.CreateHabit);

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Get all habits
 *     description: Retrieve a list of all habits for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
 *     responses:
 *       200:
 *         description: List of habits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   frequency:
 *                     type: string
 *                   streak:
 *                     type: number
 *                   progress:
 *                     type: number
 */
router.get('/', auth, IsUser, HabitController.GetAllHabit);

/**
 * @swagger
 * /api/{id}:
 *   get:
 *     summary: Get a habit by ID
 *     description: Retrieve a habit by its ID for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the habit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit details
 *       404:
 *         description: Habit not found
 */
router.get('/:id', auth, IsUser, HabitController.GetById);

/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     summary: Delete a habit
 *     description: Deletes a habit by its ID for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the habit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       404:
 *         description: Habit not found
 */
router.delete('/:id', auth, IsUser, HabitController.DeleteHabit);

/**
 * @swagger
 * /api/{id}:
 *   patch:
 *     summary: Update a habit
 *     description: Updates a habit by its ID for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the habit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *               progress:
 *                 type: number
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       404:
 *         description: Habit not found
 */
router.patch('/:id', auth, IsUser, HabitController.UpdateHabit);

/**
 * @swagger
 * /api/sendmail:
 *   post:
 *     summary: Send a reminder email
 *     description: Sends a reminder email for a specific habit.
 *     tags:
 *       - Habits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               habitName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Error sending email
 */
router.post('/sendmail', HabitController.SendMail);



module.exports=router;