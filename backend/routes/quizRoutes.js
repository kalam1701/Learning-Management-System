const express = require("express");
const router = express.Router();
const {createQuiz,getQuizResults,attemptQuiz, getQuizzes}= require("../controllers/quizController");
const{protect} = require("../middleware/authMiddleware");

// Create quiz for a course
router.post("/:courseId/quizzes",protect,createQuiz);
// Get all quizzes for a course
router.get("/:courseId/quizzes",protect,getQuizzes);
// Attempt a quiz
router.post("/quizzes/:quizId/attempt" ,protect,attemptQuiz);
// Get quiz results (instructor)
router.get("/quizzes/:quizId/results", protect,getQuizResults);

module.exports = router;