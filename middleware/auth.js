const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utils/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
