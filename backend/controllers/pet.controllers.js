const Pet = require("../models/petModel")

const getPets = async (req, res) => {
  const queries = req.query
  const validKeys = [
    "name",
    "description",
    "image",
    "origin",
    "colors",
    "category",
    "search",
  ]
  try {
    if (queries) {
      const isValid = Object.keys(queries).every((key) =>
        validKeys.includes(key)
      )

      if (!isValid) {
        return res.status(400).json({ message: "Invalid query parameter" })
      }

      if (queries.search && queries.search.length > 0) {
        if (queries.category.length > 0) {
          const pets = await Pet.find({
            name: { $regex: new RegExp(queries.search, "i") },
            category: queries.category,
          }).select("-__v")
          return res.status(200).json(pets)
        }

        const pets = await Pet.find({
          name: { $regex: queries.search },
        }).select("-__v")

        return res.status(200).json(pets)
      }

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
  } catch (err) {
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

module.exports = {
  getPets,
  getPet,
  insertPet,
  updatePet,
  deletePet,
}
