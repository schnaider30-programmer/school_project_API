const router = require("express").Router();
const courseController = require("../controllers/courses.js");
const courseVal = require("../utilities/course-validation.js");
const {isAuthenticated} = require("../utilities/authenticate.js");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getOneCourse);
router.post(
  "/",
  isAuthenticated,
  courseVal.courseValidationRules,
  courseVal.validateRequest,
  courseController.addCourse,
);
router.put(
  "/:id",
  isAuthenticated,
  courseVal.courseUpdateValidationRules,
  courseVal.validateRequest,
  courseController.modifyCourseData,
);
router.delete("/:id", isAuthenticated, courseController.deteleCourse);

module.exports = router