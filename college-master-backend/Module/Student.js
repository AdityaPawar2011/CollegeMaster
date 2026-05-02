const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    rollNumber: {
      type: String,
      required: [true, "Please provide a roll number"],
      unique: true,
    },
    department: {
      type: String,
      required: [true, "Please provide a department"],
    },
    semester: {
      type: Number,
      required: [true, "Please provide a semester"],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    totalSubjects: {
      type: Number,
      default: 0,
    },
    attendancePercentage: {
      type: Number,
      default: 0,
    },
    pendingFees: {
      type: Number,
      default: 0,
    },
    cgpa: {
      type: Number,
      default: 0,
    },
    subjects: [
      {
        name: { type: String, default: "" },
        teacher: { type: String, default: "" },
        attendance: { type: Number, default: 0 },
        internalScore: { type: String, default: "" },
        externalScore: { type: String, default: "" },
        totalScore: { type: String, default: "" },
        grade: { type: String, default: "" },
        credits: { type: String, default: "" },
      },
    ],
    notices: [
      {
        title: { type: String, default: "" },
        date: { type: String, default: "" },
        subtitle: { type: String, default: "" },
      },
    ],
    activities: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        time: { type: String, default: "" },
        icon: { type: String, default: "" },
        iconColor: { type: String, default: "" },
      },
    ],
    fees: [
      {
        semester: { type: String, default: "" },
        total: { type: String, default: "" },
        paid: { type: String, default: "" },
        pending: { type: String, default: "" },
        due: { type: String, default: "" },
        status: { type: String, default: "" },
        statusClass: { type: String, default: "" },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Compare password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
