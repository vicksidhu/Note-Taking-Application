const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Serve frontend files
app.use(express.static("public"));

// Test route
app.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

// Server port
const PORT = process.env.PORT || 5000;

// Connect to database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
