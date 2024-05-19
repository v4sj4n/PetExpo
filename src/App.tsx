import { FaPaw } from "react-icons/fa"
import { PiBirdFill, PiCatFill, PiDogFill } from "react-icons/pi"
import { motion } from "framer-motion"

export default function App() {
  const animalCategoryClass =
    "w-full p-8 bg-rose-200 hover:bg-rose-300 rounded-lg flex flex-col items-center justify-center"
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="flex text-balance items-center gap-2 flex-col md:flex-row md:gap-6 text-4xl text-center  md:text-5xl mb-6 text-zinc-100">
        Welcome to our pet universe
        <motion.div
          whileHover={{
            rotate: [0, 30, -30],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        >
          <FaPaw className="rotate-[22.5deg]  text-rose-200 hover:text-rose-300" />
        </motion.div>
      </h1>
      <p className=" text-lg text-center text-zinc-200/75 leading-6 mb-10">
        Welcome to the pet world of your dreams, pick one of the categories
        below and start exploring your favorite pets with details and images.
      </p>

      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.5,
        }}
        className="grid grid-cols-2 gap-3 w-full mb-8"
      >
        <motion.div
          initial={{ scale: 0, x: -100, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          whileHover={{
            rotate: "-2deg",
            scale: 1.1,
            zIndex: 99,
          }}
          className={animalCategoryClass}
        >
          <a href="/pets/dogs" className="flex flex-col items-center">
            <PiDogFill className="size-20 md:size-36" />
            <h3>dogs.</h3>
          </a>
        </motion.div>
        <motion.div
          initial={{ scale: 0, x: 100, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          whileHover={{
            rotate: "2deg",
            scale: 1.1,
            zIndex: 99,
          }}
          className={animalCategoryClass}
        >
          <a href="/pets/cats" className="flex flex-col items-center">
            <PiCatFill className="size-20 md:size-36" />

            <h3>cats.</h3>
          </a>
        </motion.div>
        <motion.div
          initial={{ scale: 0, y: -100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          whileHover={{
            scale: 1.05,
            zIndex: 99,
          }}
          className={`${animalCategoryClass} col-span-2`}
        >
          <a href="/pets/birds" className="flex flex-col items-center">
            <PiBirdFill className="size-20 md:size-36" />
            <h3>birds.</h3>
          </a>
        </motion.div>
      </motion.div>
    </main>
  )
}
