const HabitAdminController=require("../controller/adminhabit.controller")
const router=require("express").Router();
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users and their habit completion status 
 *     description: Retrieve a list of all users along with their habit completion stats for admin users.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of users with their habit completion stats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   email:
 *                     type: string
 *                   habitStats:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         habitId:
 *                           type: string
 *                         name:
 *                           type: string
 *                         frequency:
 *                           type: string
 *                         streak:
 *                           type: number
 *                         progress:
 *                           type: number
 *     responses:
 *       404:
 *         description: No users found
 */
router.get("/admin/users",HabitAdminController.GetAlluserStatus)
/**
 * @swagger
 * /api/admin/habit-templates:
 *   post:
 *     summary: Create a new habit template
 *     description: Allows an admin to create a new habit template that users can adopt.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
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
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: Habit template created successfully
 *       400:
 *         description: Bad request
 */
router.post("/admin/habit-templates",HabitAdminController.HabitAdminCreate)
router.get("/admin/habit-templates",HabitAdminController.GetHabitTemplete)
module.exports=router;