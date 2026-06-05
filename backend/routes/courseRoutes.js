const express = require("express");
const router = express.Router();
const {createCourse , getAllCourses , getCourseByid } = require("../controllers/courseController")
const {protect} = require("../middleware/authMiddleware");

//Public -any one can view 
router.get("/",getAllCourses);
router.get("/:id",getCourseByid);

//Protected - only Logged in instructors can view 
router.post("/", protect, createCourse);

module.exports = router;