const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// Use CORS
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profiles"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
