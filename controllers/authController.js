// Replace this file with the logic for handling incoming requests and returning responses to the clientconst bcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;                       // 1
    if (!username || !password) {                                  // 2
      return res.status(400).json({ message: "username and password are required" });
    }

    const existing = await User.findOne({ username });             // 3
    if (existing) {
      return res.status(409).json({ message: "username already taken" }); // 4
    }

    const hashed = await bcrypt.hash(password, 10);                 // 5
    await User.create({ username, password: hashed });              // 6

    return res.status(201).json({ message: "user registered" });   // 7
  } catch (err) {
    next(err);                                                     // 8
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;                       // 9
    const user = await User.findOne({ username });                 // 10
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" }); // 11
    }

    const ok = await bcrypt.compare(password, user.password);      // 12
    if (!ok) {
      return res.status(400).json({ message: "invalid credentials" }); // 13
    }

    const token = jwt.sign(                                         // 14
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }                                          // 15
    );

    return res.json({ token });                                     // 16
  } catch (err) {
    next(err);                                                      // 17
  }
};
