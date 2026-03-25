const express = require("express");
const app = express();
const { initDb } = require("./database/index");
require("dotenv").config();
const bodyParser = require("body-parser")

PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(
    "/",
    require("./routes"),
);
    
(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🚀Server listenning on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server not started because DB connection failed:", error);
    process.exit(1);
  }
})();
