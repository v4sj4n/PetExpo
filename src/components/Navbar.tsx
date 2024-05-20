import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { LuDog, LuCat, LuBird } from "react-icons/lu"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { IsDropdownClickedContext } from "../context/IsDropdownClicked"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const { isClicked, toggleClick, isHidden, hide, show } = useContext(
    IsDropdownClickedContext
  )
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous! && latest > 200) {
      if(isClicked) {
      toggleClick()

      }
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
      <Link to="/">
        <h3 className="text-2xl text-zinc-800 font-bold">PetExpo</h3>
      </Link>
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
              isClicked && !isHidden ? "" : "hidden"
            } bg-red-50 py-2 px-4 mr-2 rounded-md`}
          >
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className="flex items-center gap-2 text-lg"
                  to="/pets/dogs"
                >
                  <LuDog width={20} />
                  Dogs
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 text-lg"
                  to="/pets/cats"
                >
                  <LuCat width={20} />
                  Cats
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 text-lg"
                  to="/pets/birds"
                >
                  <LuBird width={20} />
                  Birds
                </Link>
              </li>
            </ul>
          </motion.div>
        </li>
        <li>
          <Link to="/contact">contact</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </motion.nav>
  )
}
