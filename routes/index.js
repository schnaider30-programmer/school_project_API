const router = require("express").Router();
const swaggerRoute = require("./swagger.js");
const passport = require("passport")


router.use("/", swaggerRoute);

router.get("/login", passport.authenticate("github"));

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

router.use("/students", require("./student.js"));
router.use("/courses", require("./course.js"));

module.exports = router;
