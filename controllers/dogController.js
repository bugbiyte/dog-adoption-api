// controllers/dogController.js
const Dog = require("../models/Dog");

// 3. Dog registration
const registerDog = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      const err = new Error("Name and description are required");
      err.status = 400;
      throw err;
    }

    // Debug: see what auth middleware attached
    console.log("REGISTER DOG -> req.user:", req.user);

    const dog = await Dog.create({
      name,
      description,
      owner: req.user.id,  // this must be defined
      status: "available",
    });

    res.status(201).json(dog);
  } catch (err) {
    next(err);
  }
};

// leave the rest as you had them, or use the versions we wrote earlier:
const adoptDog = async (req, res, next) => { /* your code */ };
const removeDog = async (req, res, next) => { /* your code */ };
const listMyRegisteredDogs = async (req, res, next) => { /* your code */ };
const listMyAdoptedDogs = async (req, res, next) => { /* your code */ };

module.exports = {
  registerDog,
  adoptDog,
  removeDog,
  listMyRegisteredDogs,
  listMyAdoptedDogs,
};
