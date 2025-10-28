const Dog = require("../models/Dog");

exports.registerDog = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dog = await Dog.create({ name, description, owner: req.user.id });
    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adoptDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found." });
    if (dog.adoptedBy) return res.status(400).json({ message: "Dog already adopted." });
    if (dog.owner.toString() === req.user.id)
      return res.status(403).json({ message: "You cannot adopt your own dog." });

    dog.adoptedBy = req.user.id;
    dog.thankYouMessage = req.body.thankYouMessage || "Thank you for adopting!";
    await dog.save();
    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found." });
    if (dog.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to remove this dog." });
    if (dog.adoptedBy)
      return res.status(400).json({ message: "Cannot remove an adopted dog." });

    await Dog.findByIdAndDelete(dog._id);
    res.json({ message: "Dog removed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyDogs = async (req, res) => {
  try {
    const { page = 1, limit = 5, status } = req.query;
    const filter = { owner: req.user.id };
    if (status === "adopted") filter.adoptedBy = { $ne: null };
    if (status === "available") filter.adoptedBy = null;

    const dogs = await Dog.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdoptedDogs = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const dogs = await Dog.find({ adoptedBy: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
