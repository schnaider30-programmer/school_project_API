const router = require("express").Router();
const studentVal = require("../utilities/student-validator.js");
const studController = require("../controllers/students.js");
const {isAuthenticated} = require("../utilities/authenticate.js");

router.get("/", studController.getAllStudents);
router.get("/:id", studController.getOneStudent);
router.post(
  "/",
  isAuthenticated,
  studentVal.studentValidationRules,
  studentVal.validateRequest,
  studController.addStudent,
);
router.put(
  "/:id",
  isAuthenticated,
  studentVal.studentUpdateValidationRules,
  studentVal.validateRequest,
  studController.modifyStudentData,
);
router.delete("/:id", isAuthenticated, studController.deteleStudent);

module.exports = router