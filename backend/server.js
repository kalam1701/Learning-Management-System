const dotenv = require("dotenv");
dotenv.config(); //load .env file

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const assigmentRoutes = require("./routes/assignmentRoutes")
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow reading JSON from request body

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/courses" , courseRoutes);
app.use("/api/courses" , assigmentRoutes);
app.use("/api/courses", quizRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});