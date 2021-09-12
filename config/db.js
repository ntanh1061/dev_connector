const mongoose = require("mongoose");
const config = require("config");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), () => {
      console.log("MongoDB connected...");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
