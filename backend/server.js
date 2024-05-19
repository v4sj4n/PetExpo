const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 4444
const petRouter = require("./routes/pet.routes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("Hi there")
})

app.use("/api/", petRouter.router)

mongoose
  .connect("mongodb://root:rootpassword@172.17.0.1:27017/")
  .then(() => console.log("Connected"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})