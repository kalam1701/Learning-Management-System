const Progress = require("../model/Progress");
const Course = require("../model/Course");
const Assignment = require("../model/Assignment");
const Quiz = require("../model/Quiz");

// ───── MARK VIDEO AS WATCHED ─────
const markVideoWatched = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;

    // Find or create progress document for this student + course
    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        course: courseId
      });
    }

    // Check if already marked
    if (progress.completedVideos.includes(videoId)) {
      return res.status(400).json({ message: "Video already marked as watched" });
    }

    progress.completedVideos.push(videoId);

    // Calculate percentage
    progress.percentage = await calculateProgress(progress, courseId);

    await progress.save();

    res.status(200).json({ message: "Video marked as watched", progress });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ───── MARK ASSIGNMENT AS COMPLETED ─────
const markAssignmentCompleted = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;

    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        course: courseId
      });
    }

    if (progress.completedAssignments.includes(assignmentId)) {
      return res.status(400).json({ message: "Assignment already completed" });
    }

    progress.completedAssignments.push(assignmentId);
    progress.percentage = await calculateProgress(progress, courseId);

    await progress.save();

    res.status(200).json({ message: "Assignment marked as completed", progress });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ───── MARK QUIZ AS COMPLETED ─────
const markQuizCompleted = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;

    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        course: courseId
      });
    }

    if (progress.completedQuizzes.includes(quizId)) {
      return res.status(400).json({ message: "Quiz already completed" });
    }

    progress.completedQuizzes.push(quizId);
    progress.percentage = await calculateProgress(progress, courseId);

    await progress.save();

    res.status(200).json({ message: "Quiz marked as completed", progress });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ───── GET MY PROGRESS FOR A COURSE ─────
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId
    });

    if (!progress) {
      return res.status(200).json({ percentage: 0, message: "Not started yet" });
    }

    res.status(200).json(progress);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ───── HELPER: CALCULATE PROGRESS PERCENTAGE ─────
const calculateProgress = async (progress, courseId) => {
  const course = await Course.findById(courseId);
  const assignments = await Assignment.find({ course: courseId });
  const quizzes = await Quiz.find({ course: courseId });

  const totalVideos = course.videos.length;
  const totalAssignments = assignments.length;
  const totalQuizzes = quizzes.length;

  const total = totalVideos + totalAssignments + totalQuizzes;

  if (total === 0) return 0;

  const completed =
    progress.completedVideos.length +
    progress.completedAssignments.length +
    progress.completedQuizzes.length;

  return Math.round((completed / total) * 100);
};

module.exports = { markVideoWatched, markAssignmentCompleted, markQuizCompleted, getProgress };