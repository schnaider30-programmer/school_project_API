const Student = require("../models/students");
const stud = {};
const { ObjectId } = require("mongodb");

stud.getOneStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);

  try {
    const result = await Student.findById(studentId);
    if (!result) {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Student not found with id: ${req.params.id}`,
      });
    }
    res.status(200).json({ sucess: true, status: 200, result});
  } catch (error) {
    res.status(500).json({
      sucess: false,
      status: 500,
      message: `An error occurs while retrieving student with id: ${req.params.id}.`,
    });
    console.log(`Error: ${error}`);
  }
};

stud.getAllStudents = async (req, res) => {
  try {
    const result = await Student.find({});
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Couldn't retrieves students from database.",
      });
    }
    res
      .status(200)
      .json({ success: true, status: 200, result});
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "An error occurs while retrieving data.",
    });
    console.log(" Get All student error " + error);
  }
};

stud.addStudent = async (req, res) => {
  try {
    // Validate request
    if (
      !req.body.studentID ||
      !req.body.name ||
      !req.body.email ||
      !req.body.major ||
      !req.body.year ||
      !req.body.enrolledCourses ||
      !req.body.status ||
      !req.body.enrolledAt
    ) {
      res.status(400).send({
        success: false,
        status: 400,
        message: "Please check. No field should be empty!",
      });
      return;
    }
    const student = new Student({
      studentID: req.body.studentID,
      name: req.body.name,
      email: req.body.email,
      major: req.body.major,
      year: req.body.year,
      enrolledCourses: req.body.enrolledCourses,
      status: req.body.status,
      enrolledAt: req.body.enrolledAt,
    });

    const result = await student.save(student);
    res.status(201).json({
      success: true,
      status: 201,
      message: "A new student was successfully added to database",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Some error occurred while adding new student",
    });
    console.log("Adding error: " + error.message);
  }
};

stud.modifyStudentData = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body) {
      res
        .status(400)
        .json({
          success: false,
          status: 400,
          message: "Update is not possible without data.",
        });
      return;
    }
    const {
      studentID,
      name,
      email,
      year,
      enrolledCourses,
      status,
      enrolledAt,
    } = req.body;
    const result = await Student.findByIdAndUpdate(id, {
      studentID: studentID,
      name: name,
      email: email,
      year: year,
      enrolledCourses: enrolledCourses,
      status: status,
      enrolledAt: enrolledAt,
    });
    if (!result) {
      res.status(404).json({
        success: false,
        status: 404,
        message:
          "Cannot update Student. Maybe student with id " +
          id +
          " was not found.",
      });
    } else {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Student was updated successfully.", 
        result,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        status: 500,
        message: "Error occurs while updating student data.",
      });
    console.log("Update error:" + error.message);
  }
};

stud.deteleStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Student was successfully deleted.",
      });
    } else {
      res.status(400).json({
        success: false,
        status: 400,
        message:
          "The deletion failed. Maybe this student has already been deleted!",
      });
    }
  } catch (error) {
    res
      .starus(500)
      .json({
        success: false,
        status: 500,
        message: "An error occurs while deleting student.",
      });
    console.log("Deletion error: " + error.message);
  }
};

module.exports = stud;
