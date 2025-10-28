const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  registerDog,
  adoptDog,
  removeDog,
  getMyDogs,
  getAdoptedDogs
} = require("../controllers/dogController");

// Authenticated routes:
router.post("/", auth, registerDog);          // POST /api/dogs
router.post("/:id/adopt", auth, adoptDog);    // POST /api/dogs/:id/adopt
router.delete("/:id", auth, removeDog);       // DELETE /api/dogs/:id
router.get("/mine", auth, getMyDogs);         // GET /api/dogs/mine
router.get("/adopted", auth, getAdoptedDogs); // GET /api/dogs/adopted

module.exports = router;