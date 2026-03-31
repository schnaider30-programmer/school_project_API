const { body, validationResult } = require("express-validator");

// Validation rules
const studentValidationRules = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  body("studentID")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Student ID is required")
    .bail()
    .isAlphanumeric()
    .withMessage("Student ID must contain only letters and numbers"),

  body("email")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("major")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Major is required")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Major must contain only letters and spaces"),

  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage("Year must be a valid integer between 1 and 10")
    .bail()
    .toInt(),

  body("enrolledCourses")
    .customSanitizer((courses) => {
      if (Array.isArray(courses)) return courses;
      return courses.split(",").map(c => c.trim())
    })
    .custom((courses) => {
      const regex = /^[A-Z]{3}\d{3}$/;
      if (!courses.every((course) => regex.test(course))) {
        throw new Error("Each course must follow format like CSE111");
      }
      return true;
    }),

  body("status")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Status is required")
    .bail()
    .isIn(["active", "graduating", "dropped"])
    .withMessage("Status must be one of: active, graduating, dropped"),

  body("enrolledAt")
    .trim()
    .notEmpty()
    .withMessage("Enrollment date is required")
    .bail()
    .isISO8601()
    .withMessage(
      'Enrollment date must be a valid ISO8601 date (e.g., "2026-03-31" or "2026-03-31T15:00:00")',
    ),
];

const studentUpdateValidationRules = [
  body("name")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .bail()
    .withMessage("Name cannot be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  body("studentID")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .bail()
    .withMessage("Student ID cannot be empty")
    .isAlphanumeric()
    .withMessage("Student ID must contain only letters and numbers"),

  body("email")
    .optional()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("major")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Major cannot be empty")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Major must contain only letters and spaces"),

  body("year")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Year cannot be empty")
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage("Year must be a valid integer between 1 and 10")
    .toInt(),

  body("enrolledCourses")
    .optional()
    .customSanitizer((courses) => {
      if (Array.isArray(courses)) return courses;
      return courses.split(",").map((c) => c.trim());
    })
    .isArray({ min: 1 })
    .withMessage("Enrolled courses must be a non-empty array")
    .bail()
    .custom((courses) => {
      const regex = /^[A-Z]{3}\d{3}$/; // e.g., CSE111
      if (!courses.every((course) => regex.test(course))) {
        throw new Error("Each course must follow format like CSE111");
      }
      return true;
    }),

  body("status")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .bail()
    .isIn(["active", "graduating", "dropped"])
    .withMessage("Status must be one of: active, graduating, dropped"),

  body("enrolledAt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Enrollment date cannot be empty")
    .bail()
    .isISO8601()
    .withMessage(
      'Enrollment date must be a valid ISO8601 date (e.g., "2026-03-31" or "2026-03-31T15:00:00")',
    ),
];


// Middleware to handle validation results
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return only the first error per field
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = { studentValidationRules, studentUpdateValidationRules, validateRequest };
