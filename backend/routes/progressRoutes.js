const express = require("express");
const router = express.Router();
const { markVideoWatched, markAssignmentCompleted, markQuizCompleted, getProgress } = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

// Get my progress for a course
router.get("/:courseId/progress", protect, getProgress);

// Mark video watched
router.post("/:courseId/progress/video/:videoId", protect, markVideoWatched);

// Mark assignment completed
router.post("/:courseId/progress/assignment/:assignmentId", protect, markAssignmentCompleted);

// Mark quiz completed
router.post("/:courseId/progress/quiz/:quizId", protect, markQuizCompleted);

module.exports = router;