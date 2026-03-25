const swaggerAutogen = require("swagger-autogen");

const docs = {
  info: {
    title: "School API Documentation",
    description: "An API to retrieve student from database.",
  },
  host: "https://school-api-u7xc.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointRoute = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointRoute, docs);