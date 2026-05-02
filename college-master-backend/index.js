const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const Port = process.env.PORT;
const cors = require("cors");

// CORS Middleware
app.use(cors());



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB ✓");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// Routes
app.use("/api/students", require("./Route/StudentRoute"));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});