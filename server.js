const express = require("express");
const app = express();
const { initDb } = require("./database/index");
require("dotenv").config();
const bodyParser = require("body-parser")

const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(
    "/",
    require("./routes"),
);
    
(async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`🚀Server listenning on port ${port}`);
    });
  } catch (error) {
    console.error("Server not started because DB connection failed:", error);
    process.exit(1);
  }
})();
