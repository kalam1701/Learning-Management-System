const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

dotenv.config(); //load .env file
const app = express();

app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow reading JSON from request body

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(5000, () => {
  console.log(`Server Running on ${PORT}`);
});