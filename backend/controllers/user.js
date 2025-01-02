const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: "JohnDoe"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Server error
 */

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = {
      username: username,
      password: password,
      email: email,
    };

    await User.create(user);
    res.status(200).json({ msg: "User Registered successfully " });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User logged in Successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized - password does not match
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // token expiry
    );

    res.status(200).json({ msg: "User logged in Successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the decoded token
    const userData = await User.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    console.log(userData);

    res
      .status(200)
      .json({ msg: "User data fetched Successfully", user_data: userData });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { registerUser, login, getUserData };
