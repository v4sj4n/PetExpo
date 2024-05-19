const mongoose = require("mongoose")

const PetSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  origin: {
    type: String,
    required: [true, "Origin is required"],
  },
  colors: {
    type: [String],
    required: [true, "Colors is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["bird", "cat", "dog"],
  },
})

const Pet = mongoose.model("Pet", PetSchema)

module.exports = Pet
