const Todo = require("../models/todo");

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve all todos for the logged-in user
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of todos for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64b1f99e2e8f8d0017f7f7f3"
 *                   userId:
 *                     type: string
 *                     example: "64b1f99e2e8f8d0017f7f7f2"
 *                   description:
 *                     type: string
 *                     example: "Complete project documentation"
 *                   priority:
 *                     type: string
 *                     enum: [high, medium, low]
 *                     example: "high"
 *                   completed:
 *                     type: boolean
 *                     example: false
 *       401:
 *         description: Unauthorized or token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       500:
 *         description: Server error
 */

const getTodos = async (req, res) => {
  try {
    // Get userId from the decoded token (added by authMiddleware)
    const userId = req.user.userId;

    const todos = await Todo.find({ userId });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo for the logged-in user
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Learn Swagger"
 *               priority:
 *                 type: string
 *                 enum: [high, medium, low]
 *                 example: "medium"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Todo created successfully"
 *                 todo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64b1f99e2e8f8d0017f7f7f3"
 *                     description:
 *                       type: string
 *                       example: "Learn Swagger"
 *                     priority:
 *                       type: string
 *                       example: "medium"
 *                     completed:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

const createTodo = async (req, res) => {
  try {
    // Get userId from the decoded token (added by authMiddleware)
    const userId = req.user.userId;

    const { description, priority } = req.body;

    const todo = new Todo({
      description,
      priority,
      userId, // logged-in userid
    });

    await todo.save();

    res.status(201).json({ msg: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update an existing todo for the logged-in user
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: string
 *           example: "64b1f99e2e8f8d0017f7f7f3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Update Swagger documentation"
 *               priority:
 *                 type: string
 *                 enum: [high, medium, low]
 *                 example: "high"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Todo updated successfully"
 *                 todo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64b1f99e2e8f8d0017f7f7f3"
 *                     description:
 *                       type: string
 *                       example: "Update Swagger documentation"
 *                     priority:
 *                       type: string
 *                       example: "high"
 *                     completed:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Todo not found or not authorized
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

const updateTodo = async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    // console.log("IDDDDD", id);
    const userId = req.user.userId; // Get the user ID from the decoded token
    // console.log(userId);
    const { description, priority, completed } = req.body;

    // Find the todo and check if it belongs to the logged in user
    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found or not authorized" });
    }

    // Update fields if provided
    if (description !== undefined) todo.description = description;
    if (priority !== undefined) todo.priority = priority;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();

    res
      .status(200)
      .json({ msg: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete an existing todo for the logged-in user
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *           example: "64b1f99e2e8f8d0017f7f7f3"
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Todo deleted successfully"
 *       404:
 *         description: Todo not found or not authorized
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Get the user ID from the decoded token

    // Find the todo and check if it belongs to the loggedin user
    const todo = await Todo.findOneAndDelete({ _id: id, userId });
    console.log(todo);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found or not authorized" });
    }

    res.status(200).json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
