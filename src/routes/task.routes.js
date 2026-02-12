const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of your task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           description: The status of the task
 *           enum: [pending, in-progress, completed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was last updated
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The tasks managing API
 */

router.use(protect);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 *
 *   get:
 *     summary: Returns the list of all the user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

router.route('/')
    .post(taskController.createTask)
    .get(taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update the task by the id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 *       500:
 *         description: Some error happened
 *
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       204:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 */
router.route('/:id')
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
