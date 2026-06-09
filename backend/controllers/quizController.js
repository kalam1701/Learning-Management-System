const Quiz = require("../model/Quiz");
const Course = require("../model/Course");

// ───── CREATE QUIZ (instructor only) ─────

const createQuiz = async (req, res) => {
    try {
        if (req.user.role !== "instructor") {
            return res.status(403).json({ message: " Only instructor can create the quiz " });
        }

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "You did not create this course" });
        }

        const { title, questions } = req.body;

        const quiz = await Quiz.create({
            title,
            questions,
            course: req.params.courseId,
            instructor: req.user.id
        });
        res.status(201).json({ message: "Quiz created", quiz });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ───── GET ALL QUIZZES FOR A COURSE ─────

const getQuizzes = async (req, res) => {
    try {
        // Hide correctAnswer from students
        const quizzes = await Quiz.find({ course: req.params.courseId }).select("-questions.correctAnswer -attempts"); // hides if used "-"before parameter "

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// ───── ATTEMPT QUIZ (student only) ─────

const attemptQuiz = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can attempt quizzes" });
        }

        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        // Check if already attempted
        const alreadyAttempted = quiz.attempts.find(
            att => att.student.toString() === req.user.id
        );
        if (alreadyAttempted) {
            return res.status(400).json({ message: "You already attempted this quiz" });
        }
        // req.body.answers = [0, 2, 1, 3] (student's chosen option index for each question)
        const { answers } = req.body;
        // Calculate score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });
        const total = quiz.questions.length;
        // Save attempt

        quiz.attempts.push({
            student: req.user.id,
            score,
            total
        });

        await quiz.save();

        res.status(200).json({
            message: "Quiz submitted",
            score,
            total,
            percentage: Math.round((score / total) * 100) + "%"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};
// ───── GET QUIZ RESULTS (instructor only) ─────

const getQuizResults = async (req, res) => {
    try {
        if (req.user.role !== "instructor") {
            return res.status(403).json({ message: "Only instructors can view results" });
        }
        const quiz = await Quiz.findById(req.params.quizId).populate("attempts.student", "name , email");

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz.attempts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createQuiz, getQuizzes , attemptQuiz , getQuizResults};