const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/authController");

//when someone hits POST /api/auth/register ->run register
router.post("/register" , registerUser);

// When someone hits POST /api/auth/login → run loginUser
router.post("/login" , loginUser);

module.exports = router ;