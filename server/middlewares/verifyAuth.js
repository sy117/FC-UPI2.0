const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Check Header
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[0] != "Bearer"
  ) {
    return res.status(401).json({ message: "Token not found!" });
  }
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found!" });
  }
  // Verify Token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token!!" });
  }
};
