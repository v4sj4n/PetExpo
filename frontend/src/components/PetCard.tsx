import { useState } from "react"
import { motion } from "framer-motion"
import { FullPetCard } from "./FullPetCard"
import { Animal } from "../types"

export const PetCard = ({
  animal,
  animalType,
}: {
  animal: Animal
  animalType: string
}) => {
  const [showFullCard, setShowFullCard] = useState(false)
  return (
    <motion.div className="rounded-xl overflow-hidden">
      <img
        src={`${animal.image}?q=10`}
        alt={`${animal.name} image`}
        className="h-60 w-full object-cover"
      />
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl">{animal.name}</p>
        <span className="text-white/60">{animal.origin}</span>
      </div>
      <a
        className="text-gray-50 block text-end cursor-pointer"
        onClick={() => setShowFullCard((prev) => !prev)}
      >
        More details
      </a>
      {showFullCard && (
        <FullPetCard
          animal={animal}
          animalType={animalType}
          closeCard={() => setShowFullCard((prev) => !prev)}
        />
      )}
    </motion.div>
  )
}
