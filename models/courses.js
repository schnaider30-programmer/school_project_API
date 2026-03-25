const { Schema } = require("mongoose");

const courseSchema = new Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  credits: { type: Number, required: true },
  instructor: { type: String, required: true },
  semester: { type: String, require: true },
});

const Course = require("mongoose").model("Course", courseSchema);

module.exports = Course;
