const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    studentID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    year: { type: Number, min: 1, required: true },
    enrolledCourses: { type: [String], required: true },
    status: {
      type: String,
      enum: ["active", "graduating", "dropped"],
      default: "active",
      required: true,
    },
    enrolledAt: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
      required: true,
    },
  },
  { versionKey: false },
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
