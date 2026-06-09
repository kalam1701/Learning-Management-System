const express = require("express");
const router = express.Router();
const {createAssignment,submitAssignment,getAllAssignment,gradeAssignment} = require("../controllers/assignmentController");
const {protect} = require("../middleware/authMiddleware");

// Create assignment for a course
router.post("/:courseId/assignments",protect, createAssignment);
// Get all assignments for a course
router.get("/:courseId/assignments",protect,getAllAssignment);
// Submit an assignment
router.post("/assignments/:assignmentId/submit",protect,submitAssignment);
// Grade a submission
router.put("/assignments/:assignmentId/grade/:studentId", protect , gradeAssignment);

module.exports = router;