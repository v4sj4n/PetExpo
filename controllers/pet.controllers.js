const Pet = require("../models/petModel");

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({}).select("-__v");
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPet = async (req, res) => {
  try {
    const { id } = await req.params;
    const pet = await Pet.findById(id).select("-__v");
    res.status(200).json(pet);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const insertPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const { id } = await req.params;
    const pet = await Pet.findByIdAndUpdate(id, req.body);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const updatedPet = await Pet.findById(id).select("-__v");
    res.status(200).json(updatedPet);
  } catch {
    res.status(500).json({ message: err.message });
  }
};
const deletePet = async (req, res) => {
  try {
    const { id } = await req.params;
    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPetCategory = async (req, res) => {
    const { petCategory } = req.params;
    const pets = await Pet.find({ category: petCategory }).select("-__v");
}


module.exports = { getPets, getPet, insertPet, updatePet, deletePet };
