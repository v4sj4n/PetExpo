import { ReactNode, createContext, useState } from "react"

const initialState = {
  isClicked: false,
  toggleClick: () => {},
  isHidden: false,
  hide: () => {},
  show: () => {},
}

const IsDropdownClickedContext = createContext(initialState)

const IsDropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isHidden, setHidden] = useState(false)

  const toggleClick = () => {
    setIsClicked((prevState) => !prevState)
  }
  const hide = () => {
    setHidden(true)
  }
  const show = () => {
    setHidden(false)
  }

  return (
    <IsDropdownClickedContext.Provider
      value={{ isClicked, toggleClick, isHidden, hide, show }}
    >
      {children}
    </IsDropdownClickedContext.Provider>
  )
}

export { IsDropdownClickedContext, IsDropdownProvider }
