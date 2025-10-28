// Replace this file with custom middleware functions, including authentication and rate limitingconst jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const authHeader = req.header("Authorization");                  // 1
  const token = authHeader?.startsWith("Bearer ")                  // 2
    ? authHeader.slice(7) 
    : null;

  if (!token) {                                                    // 3
    return res.status(401).json({ message: "Missing token" });
  }

  try {                                                            // 4
    const decoded = jwt.verify(token, process.env.JWT_SECRET);     // 5
    req.user = { id: decoded.id };                                 // 6
    next();                                                        // 7
  } catch (err) {                                                  // 8
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
