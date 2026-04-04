const Course = require("../models/courses");
const course = {};
const { ObjectId } = require("mongodb");

course.getOneCourse = async (req, res) => {
  const CourseId = new ObjectId(req.params.id);

  try {
    const result = await Course.findById(CourseId);
    if (!result) {
      res
        .status(404)
        .send({
          success: false,
          status: 404,
          message: `Course not found with id: ${req.params.id}`,
        });
    }
    res.status(200).json({ sucess: true, status: 200, Result: result});
  } catch (error) {
    res.status(500).send({
      success: false,
      status: 500,
      message: `An error occurs while retrieving Course with id: ${req.params.id}.`,
    });
    console.log(`One course error: ${error}`);
  }
};

course.getAllCourses = async (req, res) => {
  try {
    const result = await Course.find({});
    if (!result) {
      res.status(404).send({
        success: false,
        status: 404,
        message: "Couldn't retrieves Courses from database.",
      });
    }
    res
      .status(200)
      .send({ success: true, status: 200, result });
  } catch (error) {
    res.status(500).send({
      success: false,
      status: 500,
      message: "An error occurs while retrieving data.",
    });
    console.log("All Course error " + error);
  }
};

course.addCourse = async (req, res) => {
  const { courseId, title, credits, instructor, semester } = req.body;
  try {
    // Validate request
    if (!courseId || !title || !credits || !instructor || !semester) {
      res
        .status(400)
        .send({
          success: false,
          status: 400,
          message: "Content can not be empty!",
        });
      return;
    }
    const course = new Course({
      courseId: courseId,
      title: title,
      credits: credits,
      instructor: instructor,
      semester: semester,
    });

    const result = await course.save(course);
    res.status(201).send({
      success: true,
      status: 201,
      message: "Great! Course was added.",
      result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      status: 500,
      message:
        "Some error occurred while adding new Course. Verify your data type",
    });
    console.log("Adding error: " + error.message);
  }
};

course.modifyCourseData = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body) {
      res.status(400).send({
        success: false,
        status: 400,
        message: "Update is not possible without data.",
      });
      return;
    }
    const { courseId, title, credits, instructor, semester } = req.body;
    const result = await Course.findByIdAndUpdate(id, {
      courseId: courseId,
      title: title,
      credits: credits,
      instructor: instructor,
      semester: semester,
    });
    if (!result) {
      res.status(404).send({
        success: false,
        status: 404,
        message:
          "Cannot update Course. Maybe Course with id " +
          id +
          " was not found.",
      });
    } else {
      const result = await Course.findById(new ObjectId(id));
      res.status(200).send({
        success: true,
        status: 200,
        message: `Course was updated successfully.`,
        result,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      status: 500,
      message: "Error occurs while updating Course data.",
    });
    console.log("Update error:" + error.message);
  }
};

course.deteleCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Course.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Course was successfully deleted.",
      });
    } else {
      res.status(400).send({
        success: false,
        status: 400,
        message:
          "The deletion failed. Maybe this Course has already been deleted!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      status: 500,
      message: "An error occurs while deleting Course.",
    });
    console.log("Deletion error: " + error.message);
  }
};

module.exports = course;
