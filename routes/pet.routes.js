const express = require("express");
const router = express.Router();
const Product = require("../models/petModel");
const {
  getPets,
  getPet,
  insertPet,
  updatePet,
  deletePet,
} = require("../controllers/pet.controllers");

router.get("/", getPets);
router.get("/:id", getPet);
router.post("/", insertPet);
router.put("/:id", updatePet);
router.get("/category/:petCategory")
router.delete("/:id", deletePet);

module.exports = PetRouter = { router };
