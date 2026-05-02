const Student = require("../Module/Student");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      department,
      semester,
      phoneNumber,
    } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNumber }],
    });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email or roll number already exists",
      });
    }

    // Create new student
    const student = await Student.create({
      name,
      email,
      password,
      rollNumber,
      department,
      semester,
      phoneNumber,
      totalSubjects: 0,
      attendancePercentage: 0,
      pendingFees: 0,
      cgpa: 0,
      subjects: [],
      notices: [],
      activities: [],
      fees: [],
    });

    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        semester: student.semester,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if student exists and get password
    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if password matches
    const isPasswordMatched = await student.matchPassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if student is active
    if (!student.isActive) {
      return res.status(403).json({
        success: false,
        message: "Student account is inactive",
      });
    }

    const token = generateToken(student._id);

    res.status(200).json({
      success: true,
      message: "Student logged in successfully",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        semester: student.semester,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Student Profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Student Profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const { name, phoneNumber, department, semester } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { name, phoneNumber, department, semester },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Students (Admin only)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.student.id);

    res.status(200).json({
      success: true,
      message: "Student account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Student
exports.logoutStudent = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student logged out successfully",
  });
};
