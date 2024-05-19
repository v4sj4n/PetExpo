const Pet = require("../models/petModel")

const getPets = async (req, res) => {
  const queries = req.query
  try {
    if (queries) {
      const pets = await Pet.find(queries).select("-__v")
      return res.status(200).json(pets)
    }
    const pets = await Pet.find({}).select("-__v")
    res.status(200).json(pets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPet = async (req, res) => {
  try {
    const { id } = await req.params
    const pet = await Pet.findById(id).select("-__v")
    res.status(200).json(pet)
  } catch {
    res.status(500).json({ message: err.message })
  }
}

const insertPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body)
    res.status(200).json(pet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updatePet = async (req, res) => {
  try {
    const { id } = await req.params
    const pet = await Pet.findByIdAndUpdate(id, req.body)

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    const updatedPet = await Pet.findById(id).select("-__v")
    res.status(200).json(updatedPet)
  } catch {
    res.status(500).json({ message: err.message })
  }
}
const deletePet = async (req, res) => {
  try {
    const { id } = await req.params
    const pet = await Pet.findByIdAndDelete(id)

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    res.status(200).json({ message: "Pet deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPetCategory = async (req, res) => {
  const { petCategory } = req.params
  if (!["birds", "cats", "dogs"].includes(petCategory)) {
    return res.status(400).json({ message: "Invalid category" })
  }
  try {
    const pets = await Pet.find({
      category:
        petCategory !== "birds"
          ? petCategory.slice(0, 3)
          : petCategory.slice(0, 4),
    }).select("-__v")
    res.status(200).json(pets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getPets,
  getPet,
  getPetCategory,
  insertPet,
  updatePet,
  deletePet,
}
