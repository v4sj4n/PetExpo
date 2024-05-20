import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { LuDog, LuCat, LuBird } from "react-icons/lu"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { IsDropdownClickedContext } from "../context/IsDropdownClicked"
import { useContext } from "react"

export const Navbar = () => {
  const { isClicked, toggleClick, isHidden, hide, show } = useContext(
    IsDropdownClickedContext
  )
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous! && latest > 200) {
      hide()
    } else {
      show()
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 h-16 bg-rose-100 flex justify-around items-center"
    >
      <a href="/">
        <h3 className="text-2xl text-zinc-800 font-bold">PetExpo</h3>
      </a>
      <ul className="flex items-center gap-2">
        <li>
          <span
            className="flex items-center cursor-pointer"
            onClick={toggleClick}
          >
            <button>pets</button>
            {!isClicked ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
          </span>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isClicked ? 1 : 0,
              y: isClicked ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 ${
              isClicked ? "" : "hidden"
            } bg-red-50 py-2 px-4 mr-2 rounded-md`}
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
    </motion.nav>
  )
}
