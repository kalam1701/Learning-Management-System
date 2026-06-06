const Course = require("../model/Course");


//-----Create Course (instructor only)-----
const createCourse = async(req,res)=>{
    try{
        //check if the person is an instructor 
        if(req.user.role !=="instructor"){
            return res.status(403).json({message: "Only instructors can create courses"})
        }

        const {title , description , price} = req.body;
        
        const course = await Course.create({
            title,
            description,
            price,
            instructor: req.user.id //comes from jwt token (protect middleware)
        });
        
        res.status(201).json({message : "Course created " , course});

    }catch(error){
        res.status(500).json({ message : error.message});
    }
};

//----------Get all courses(anyone can see)--------
const getAllCourses = async(req , res)=>{
    try {
        //popuate("instructor") replaces the instructor id with their actual name/email
        const courses = await Course.find().populate("instructor" , "name email");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//----------Get single Course------------
const getCourseByid = async (req,res) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor" , "name , email");

        if(!course){
            return res.status(404).json({message : "Course not fond"});
        }
        res.status(200).json(course);   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//-------Enroll in course (student only)-----------

const enrollCourse = async (req,res ) => {
    try {
        //Check if the person is a student 
        if(req.user.role !== "student" ){
            res.status(403).json({message : "only student can enroll "});
        }

        const course = await Course.findById(req.params.id);

        if(!course){
            return res.status(404).json({message : "Course not found "});
        }

        //Check if the student is already enrolled 
        const alreadyEnrolled = course.students.includes(req.user.id);
        if(alreadyEnrolled){
            return res.status(400).json({message: "Already enrolled in this course  "});
        }

        course.students.push(req.user.id);
        await course.save();

        res.status(200).json({message :" Enrolled Sucessfully" , course});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//--------GET MY ENROLLED COURSES (student)-----------
const getMyCourses = async (req,res) => {
    try {
        //Find all courses where student array contains this userd  id 
        const courses = await Course.find({students: req.user.id}).populate("instructor" ,"name email");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
module.exports = {createCourse , getAllCourses , getCourseByid , enrollCourse , getMyCourses};