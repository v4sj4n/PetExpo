import { createFileRoute } from "@tanstack/react-router"
import { FaPaw } from "react-icons/fa"
import { PiBirdFill, PiCatFill, PiDogFill } from "react-icons/pi"
import { motion } from "framer-motion"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  document.title = "Pet Expo - Home"
  const animalCategoryClass =
    "w-full p-8 bg-rose-200 hover:bg-rose-300 rounded-lg flex flex-col items-center justify-center"
  return (
    <main className="flex flex-col items-center md:mt-10 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-zinc-100 mt-8 mb-6 flex gap-4 flex-col md:flex-row items-center justify-center">
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
      <p className=" text-sm leading-5	 md:text-lg text-center text-zinc-200/75 md:leading-6 mb-10">
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
        <motion.a
          initial={{ scale: 0, x: -100, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          whileHover={{
            rotate: "-2deg",
            scale: 1.1,
            zIndex: 99,
          }}
          href="/pets/dogs"
          className={animalCategoryClass}
        >
          <div className="flex flex-col items-center">
            <PiDogFill className="size-20 md:size-36" />
            <h3>dogs.</h3>
          </div>
        </motion.a>
        <motion.a
          initial={{ scale: 0, x: 100, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          whileHover={{
            rotate: "2deg",
            scale: 1.1,
            zIndex: 99,
          }}
          href="/pets/cats"
          className={animalCategoryClass}
        >
          <div className="flex flex-col items-center">
            <PiCatFill className="size-20 md:size-36" />

            <h3>cats.</h3>
          </div>
        </motion.a>
        <motion.a
          initial={{ scale: 0, y: -100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          whileHover={{
            scale: 1.05,
            zIndex: 99,
          }}
          href="/pets/birds"
          className={`${animalCategoryClass} col-span-2`}
        >
          <div className="flex flex-col items-center">
            <PiBirdFill className="size-20 md:size-36" />
            <h3>birds.</h3>
          </div>
        </motion.a>
      </motion.div>
    </main>
  )
}
