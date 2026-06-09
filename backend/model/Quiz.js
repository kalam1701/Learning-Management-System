const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [
        {
            questionText: String,
            options: [String],          // array of 4 options
            correctAnswer: Number      // index of correct option (0,1,2,3)
        }
    ],
    attempts: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            score :Number ,         // how many correct
            total : Number,   // total questions
            attemptedAt: {
                type : Date,
                default : Date.now
            }
        }
    ]
},{timestamps : true});

module.exports = mongoose.model("Quiz",quizSchema)