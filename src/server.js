require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const characterRoutes = require("./routes/characterRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/characters", characterRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
