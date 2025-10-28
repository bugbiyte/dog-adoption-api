const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();              // 1
connectDB();                  // 2

const app = express();        // 3

app.use(cors());              // 4
app.use(morgan("dev"));       // 5
app.use(express.json());      // 6

app.use("/api/auth", require("./routes/authRoutes")); // 7
app.use("/api/dogs", require("./routes/dogRoutes"));  // 8

// centralized error handler (catches thrown errors from controllers)
app.use((err, req, res, next) => {                     // 9
  const status = err.status || 500;                    // 10
  res.status(status).json({                            // 11
    message: err.message || "Internal Server Error"    // 12
  });
});

const PORT = process.env.PORT || 3001;                 // 13
app.listen(PORT, () => {                               // 14
  console.log(`🚀 Server listening on port ${PORT}`);  // 15
});

module.exports = app;                                  // 16 (for tests)
