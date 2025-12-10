const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("ALL HEADERS:", req.headers);   // debugging

  const header = req.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    // This MUST match the payload from login()
    req.user = {
      id: decoded.userId,        // <-- This now matches your authController payload
      username: decoded.username
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
