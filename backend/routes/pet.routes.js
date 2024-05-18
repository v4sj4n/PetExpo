const express = require("express");
const router = express.Router();
const {
  getPets,
  getPet,
  getPetCategory,
  insertPet,
  updatePet,
  deletePet,
} = require("../controllers/pet.controllers");

router.get("/", getPets);
router.get("/:id", getPet);
router.post("/", insertPet);
router.put("/:id", updatePet);
router.get("/category/:petCategory", getPetCategory);
router.delete("/:id", deletePet);

module.exports = PetRouter = { router };
