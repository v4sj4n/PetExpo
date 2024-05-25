import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { LuDog, LuCat, LuBird } from "react-icons/lu"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { IsDropdownClickedContext } from "@/context/IsDropdownClicked"
import { useContext, useEffect, useRef } from "react"
import { Link, useRouterState } from "@tanstack/react-router"

export const Navbar = () => {
  const { isClicked, toggleClick, isHidden, hide, show } = useContext(
    IsDropdownClickedContext
  )

  const possibleAnimals = ["dogs", "cats", "birds"]
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()

    if (latest > previous!) {
      if (isClicked) {
        toggleClick()
      }
      if (latest > 200) {
        hide()
      }
    } else {
      show()
    }
  })

  const dropdownRef = useRef<HTMLLIElement | null>(null)
  const { location } = useRouterState()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isClicked
      ) {
        toggleClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [toggleClick, isClicked])

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 h-16 bg-rose-200 flex justify-around items-center"
    >
      <Link to="/">
        <h3 className="text-2xl text-zinc-800 font-bold font-display">
          PetExpo
        </h3>
      </Link>
      <ul className="flex items-center justify-center gap-3">
        <li ref={dropdownRef}>
          <span
            className={`${location.pathname.startsWith("/pets") ? "font-bold" : ""} flex items-center cursor-pointer`}
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
              {possibleAnimals.map((animal) => (
                <li key={animal}>
                  <Link
                    className="flex items-center gap-2 text-lg"
                    to="/pets/$petCategory"
                    params={{ petCategory: animal }}
                    activeProps={{ className: "font-bold" }}
                  >
                    {animal === "dogs" ? (
                      <LuDog width={20} />
                    ) : animal === "cats" ? (
                      <LuCat width={20} />
                    ) : (
                      <LuBird width={20} />
                    )}
                    {animal}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </li>
        <li>
          <Link to="/contact" activeProps={{ className: "font-bold" }}>
            contact
          </Link>
        </li>
        <li>
          <Link to="/about" activeProps={{ className: "font-bold" }}>
            about
          </Link>
        </li>
      </ul>
    </motion.nav>
  )
}
