const router = require("express").Router();
const studController = require("../controllers/students.js");
const courseController = require("../controllers/courses.js");
const swaggerRoute = require("./swagger.js");

router.use("/", swaggerRoute);
router.get("/students", studController.getAllStudents);
router.get("/students/:id", studController.getOneStudent);
router.post("/students", studController.addStudent);
router.put("/students/:id", studController.modifyStudentData);
router.delete("/students/:id", studController.deteleStudent);

// router.get("/courses", courseController.getAllCourses)
// router.get("/courses/:id", courseController.getSingleCourse)

module.exports = router;
