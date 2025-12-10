const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authMiddleware");
const {
  registerDog,
  adoptDog,
  removeDog,
  listMyRegisteredDogs,
  listMyAdoptedDogs,
} = require("../controllers/dogController");

// All dog routes require authentication
router.post("/", authenticateToken, registerDog);
router.post("/:id/adopt", authenticateToken, adoptDog);
router.delete("/:id", authenticateToken, removeDog);
router.get("/my/registered", authenticateToken, listMyRegisteredDogs);
router.get("/my/adopted", authenticateToken, listMyAdoptedDogs);

module.exports = router;
