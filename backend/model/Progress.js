const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  completedVideos: [
    {
      type: String   // video ids the student has watched
    }
  ],
  completedAssignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    }
  ],
  completedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ],
  percentage: {
    type: Number,
    default: 0       // 0% to 100%
  }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);