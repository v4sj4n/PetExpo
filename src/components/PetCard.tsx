import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FullPetCard } from "./FullPetCard"
import { Animal } from "../types"

export const PetCard = ({
  animal,
  animalType,
  index
}: {
  animal: Animal
  animalType: string
  index: number
}) => {
  const [showFullCard, setShowFullCard] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFullCard(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  return (
    <motion.div
    initial={{ scale: 0, y: 100, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="rounded-xl overflow-hidden">
      <img
        src={`${
          animalType === "dogs"
            ? "/dog.png"
            : animalType === "cats"
            ? "/cat.png"
            : "/bird.png"
        }`}
        alt=""
        className=""
      />
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl">{animal.name}</p>
        {animalType !== "birds" ? (
          <span className="text-white/60">{animal.origin}</span>
        ) : (
          <span className="text-white/60">{animal.place_of_found}</span>
        )}
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