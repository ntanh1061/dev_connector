const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!auth) {
    return res.status(401).json("Unauthorized");
  }

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        return res.status(401).json("Token is invalid");
      }

      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
};

module.exports = auth;