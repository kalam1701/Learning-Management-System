const dotenv = require("dotenv");
dotenv.config(); //load .env file
console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const assigmentRoutes = require("./routes/assignmentRoutes")

const app = express();

app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow reading JSON from request body

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/courses" , courseRoutes);
app.use("/api/courses" , assigmentRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(5000, () => {
  console.log(`Server Running on ${PORT}`);
});