const Assignment = require("../model/Assignment");
const Course = require("../model/Course");

//------------CREATE ASSIGNMENT------------

const createAssignment = async (req, res) => {
    try {
        if (req.user.role !== "instructor") {
            return res.status(403).json({ message: "Only ibstruction can create an assignment  " });
        }

        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: " course not found " });
        }
        //Make sure this instructor owns this code
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "You did not create this course" });
        }
        const { title, description, dueDate } = req.body;

        const assignment = await Assignment.create({
            title,
            description,
            dueDate,
            course: req.params.courseId,
            instructor: req.user.id
        });

        res.status(201).json({ message: " Assignment Created", assignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// ───── GET ALL ASSIGNMENTS FOR A COURSE ─────
const getAllAssignment = async (req, res) => {
    try {
        const assignments = await Assignment.find({ course: req.params.courseId }).populate("instructor", "name email");

        res.status(200).json(assignments);
    } catch (error) {

    }

};

// ───── SUBMIT ASSIGNMENT (student only) ─────
const submitAssignment = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "only student cxan submit the assignment" });
        }
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        // Check if already submitted
        const alreadySubmitted = assignment.submissions.find(sub => sub.student.toString() === req.user.id);
        if (alreadySubmitted) {
            return res.status(400).json({ message: "Already submitted" });
        }
        // Check if due date passed
        if (new Date() > new Date(assignment.dueDate)) {
            return res.status(400).json({ message: "Due date has passed" });
        }
        assignment.submissions.push({
            student: req.user.id,
            answer: req.body.answer
        });
        await assignment.save();
        res.status(200).json({ message: "Assignment submitted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};
// ───── GRADE SUBMISSION (instructor only) ─────

const gradeAssignment = async (req, res) => {
    try {
        if (req.user.role !== "instructor") {
            return res.status(403).json({ message: "Only instructors can grade" });
        }
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        // Find the student's submission
        const submission = assignment.submissions.find(
            sub => sub.student.toString() === req.params.studentId
        );
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        submission.grade = req.body.grade;
        await assignment.save();

        res.status(200).json({ message: "Graded successfully", submission });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

module.exports = {createAssignment, getAllAssignment , submitAssignment , gradeAssignment};