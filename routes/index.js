const router = require("express").Router();
const studController = require("../controllers/students.js");
const courseController = require("../controllers/courses.js");
const swaggerRoute = require("./swagger.js");
const studentVal = require("../utilities/student-validator.js");
const courseVal = require("../utilities/course-validation.js");

router.use("/", swaggerRoute);
router.get("/students", studController.getAllStudents);
router.get("/students/:id", studController.getOneStudent);
router.post(
  "/students",
  studentVal.studentValidationRules,
  studentVal.validateRequest,
  studController.addStudent,
);
router.put(
  "/students/:id",
  studentVal.studentUpdateValidationRules,
  studentVal.validateRequest,
  studController.modifyStudentData,
);
router.delete("/students/:id", studController.deteleStudent);

router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getOneCourse);
router.post(
  "/courses",
  courseVal.courseValidationRules,
  courseVal.validateRequest,
  courseController.addCourse,
);
router.put(
  "/courses/:id",
  courseVal.courseUpdateValidationRules,
  courseVal.validateRequest,
  courseController.modifyCourseData,
);
router.delete("/courses/:id", courseController.deteleCourse);

module.exports = router;
