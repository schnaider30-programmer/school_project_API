const Student = require("../models/students");
const stud = {};
const { ObjectId } = require("mongodb");

stud.getOneStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);

  try {
    const result = await Student.findById(studentId);
    if (!result) {
      res
        .status(404)
        .json({ message: `Student not found with id: ${req.params.id}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: `An error occurs while retrieving student with id: ${req.params.id}.`
    });
    console.log(`Error: ${error}`);
  }
};

stud.getAllStudents = async (req, res) => {
  try {
    const result = await Student.find({});
    console.log(result);
    if (!result) {
      res
        .status(404)
        .json({ message: "Couldn't retrieves students from database." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "An error occurs while retrieving data."
    });
    console.log( " Get All student error " + error)
  }
};

stud.addStudent = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
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
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while adding new student",
    });
    console.log("Adding error: " + error.message)
  }
};

stud.modifyStudentData = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body) {
      res.status(400).json({ message: "Update is not possible without data." });
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
      enrolledAt: enrolledAt
    });
    if (!result) {
      res
        .status(404)
        .json({
          message:
            "Cannot update Student. Maybe student with id " +
            id +
            " was not found.",
        });
    } else {
      res.status(200).send({ message: "Student was updated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurs while updating student data." })
    console.log("Update error:" + error.message)
  }
};

stud.deteleStudent = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Student.deleteOne({ _id: id })
    if (result.deletedCount > 0) {
      res.status(200).json({message: "Student with id " + id + " was successfully deleted."})
    } else {
      res.status(400).json({message: "The deletion failed. Maybe this student has already been deleted!"})
    }
  } catch (error) {
    res.starus(500).json({ message: "An error occurs while deleting student." })
    console.log("Deletion error: "  + error.message)
  }
}

module.exports = stud;
