const SwaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const router = require("express").Router();

router.use("/api-docs", SwaggerUI.serve);
router.get("/api-docs", SwaggerUI.setup(swaggerDocument));

module.exports = router;
