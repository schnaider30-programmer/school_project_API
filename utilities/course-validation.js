const { body, validationResult } = require("express-validator");

// Rules for creating a course (POST)
const courseValidationRules = [
  body("courseId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Course ID is required")
    .bail()
    .matches(/^[A-Z]{3}\d{3}$/)
    .withMessage("Course ID must follow format like CSE111"),

  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string"),

  body("credits")
    .notEmpty()
    .withMessage("Credits are required")
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage("Credits must be an integer between 1 and 10")
    .bail()
    .toInt(),

  body("instructor")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Instructor is required")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Instructor must contain only letters and spaces"),

  body("semester")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Semester is required")
    .bail()
    .isIn(["Spring", "Summer", "Fall", "Winter"])
    .withMessage("Semester must be one of: Spring, Summer, Fall, Winter"),
];

// Rules for updating a course (PUT) → fields optional but validated if present
const courseUpdateValidationRules = [
  body("courseId")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Course ID cannot be empty")
    .bail()
    .matches(/^[A-Z]{3}\d{3}$/)
    .withMessage("Course ID must follow format like CSE111"),

  body("title")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string"),

  body("credits")
    .optional()
    .notEmpty()
    .withMessage("Credits cannot be empty")
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage("Credits must be an integer between 1 and 10")
    .bail()
    .toInt(),

  body("instructor")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Instructor cannot be empty")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Instructor must contain only letters and spaces"),

  body("semester")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Semester cannot be empty")
    .bail()
    .isIn(["Spring", "Summer", "Fall", "Winter"])
    .withMessage("Semester must be one of: Spring, Summer, Fall, Winter"),
];

// Middleware to handle validation results
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: 400,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  courseValidationRules,
  courseUpdateValidationRules,
  validateRequest,
};
