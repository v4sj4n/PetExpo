import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { LuDog, LuCat, LuBird } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isAnimalToggleOpen, setIsAnimalToggleOpen] = useState(false);
  const handleAnimalToggle = () => setIsAnimalToggleOpen((prev) => !prev);
  return (
    <nav className="sticky top-0 h-16 bg-rose-100 flex justify-around items-center">
      <a href="/">
        <h3 className="text-2xl text-zinc-800 font-bold">PetExpo</h3>
      </a>
      <ul className="flex gap-2">
        <li>
          <span
            className="flex items-center cursor-pointer"
            onClick={handleAnimalToggle}
          >
            <button>pets</button>
            {!isAnimalToggleOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
          </span>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isAnimalToggleOpen ? 1 : 0,
              y: isAnimalToggleOpen ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 ${
              isAnimalToggleOpen ? "" : "hidden"
            } bg-red-50 py-2 px-4 mr-2 rounded-md `}
          >
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  className="flex items-center gap-2 text-lg"
                  href="/pets/dogs"
                >
                  <LuDog width={20} />
                  Dogs
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-lg"
                  href="/pets/cats"
                >
                  <LuCat width={20} />
                  Cats
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-lg"
                  href="/pets/birds"
                >
                  <LuBird width={20} />
                  Birds
                </a>
              </li>
            </ul>
          </motion.div>
        </li>
        <li>
          <a href="/contact">contact</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>
      </ul>
    </nav>
  );
};
