const express = require("express");
const { registerUser, login, getUserData } = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

//!protected Route
router.get("/user-data", authMiddleware, getUserData);

module.exports = router;
