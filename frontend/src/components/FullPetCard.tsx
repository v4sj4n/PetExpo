import { MdClose, MdOutlineInvertColors, MdLocationPin } from "react-icons/md"
import { motion } from "framer-motion"
import { Animal } from "../types"

export const FullPetCard = ({
  animal,
  animalType,
  closeCard,
}: {
  animal: Animal
  animalType: string
  closeCard: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 h-screen w-full bg-transparent backdrop-blur-sm z-0"
      onClick={closeCard}
    >
      <div
        className="fixed z-50  rounded-xl bg-zinc-800 md:w-4/12 top-20 left-0 right-0 md:mx-auto pt-4 pb-6 px-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center text-2xl mb-2 text-white">
          <MdClose className="cursor-pointer" onClick={closeCard} />
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4  items-start md:items-center">
            <img
              src={animal.image}
              className="size-40 object-cover md:size-16 rounded-md"
              alt={animal.name.slice(0, 3)}
            />
            <h3 className="text-3xl md:text-4xl font-light text-white">
              {animal.name.toUpperCase()}
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-white/75 text-md text-balance">
              {animal.description}{" "}
              {animal.origin && animalType === "dogs" ? (
                <>
                  Originated from{" "}
                  <span className="font-bold">{animal.origin}</span>
                </>
              ) : (
                ""
              )}
            </p>

            <p className="text-slate-300 text-md font-bold flex items-center gap-2">
              <MdLocationPin className="text-2xl" />
              <span className="font-bold">{animal.origin}</span>
            </p>
            <p className="text-slate-300 text-md font-bold flex items-center gap-2">
              <MdOutlineInvertColors className="text-2xl" />
              <span className="">
                {animal.colors.map((color, id) => {
                  return `${color}${
                    animal.colors.length - 1 !== id ? ", " : ""
                  }`
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
