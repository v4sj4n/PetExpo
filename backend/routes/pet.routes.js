const express = require("express")
const router = express.Router()
const {
  getPets,
  getPet,
  insertPet,
  updatePet,
  deletePet,
} = require("../controllers/pet.controllers")

router.get("/pets", getPets)
router.get("/pets/:id", getPet)
router.post("/pets", insertPet)
router.put("/pets/:id", updatePet)
router.delete("/pets/:id", deletePet)

module.exports = PetRouter = { router }
