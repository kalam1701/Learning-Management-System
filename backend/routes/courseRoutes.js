const express = require("express");
const router = express.Router();
const {createCourse , getAllCourses , getCourseByid  , enrollCourse , getMyCourses , uploadVideo} = require("../controllers/courseController")
const {protect} = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

//Public -any one can view 
router.get("/",getAllCourses);

router.get("/my/courses", protect ,getMyCourses);
router.get("/:id",getCourseByid);
//Protected - only Logged in instructors can view 
router.post("/", protect, createCourse);
router.post("/:id/enroll" , protect , enrollCourse);
router.post("/:id/upload-video",protect , upload.single("video"), uploadVideo);

module.exports = router;