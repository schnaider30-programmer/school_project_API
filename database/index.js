const mongoose = require("mongoose");

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connection to database established");
  } catch (err) {
    throw new Error(err.message);
  } 
};

module.exports = { initDb };
