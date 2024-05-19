import { ReactNode, createContext, useState } from "react"

const initialState = {
  isClicked: false,
  toggleClick: () => {},
}

const IsDropdownClickedContext = createContext(initialState)

const IsDropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false)

  const toggleClick = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <IsDropdownClickedContext.Provider value={{ isClicked, toggleClick }}>
      {children}
    </IsDropdownClickedContext.Provider>
  )
}

export { IsDropdownClickedContext, IsDropdownProvider }
