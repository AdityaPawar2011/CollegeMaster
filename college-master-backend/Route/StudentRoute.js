const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  getAllStudents,
  deleteStudent,
  logoutStudent,
} = require("../Controller/StudentController");
const { isAuthenticated } = require("../Middleware/auth");

// Public routes
router.post("/register", registerStudent);
router.post("/login", loginStudent);

// Protected routes
router.get("/profile", isAuthenticated, getStudentProfile);
router.put("/profile", isAuthenticated, updateStudentProfile);
router.delete("/profile", isAuthenticated, deleteStudent);
router.post("/logout", isAuthenticated, logoutStudent);

// Admin routes
router.get("/", getAllStudents);

module.exports = router;
