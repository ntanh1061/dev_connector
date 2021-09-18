const mongoose = require("mongoose");
const config = require("config");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongo DB connected...")
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
