import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import PetCategory from "./pages/PetCategory"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Error from "./pages/Error"
import { IsDropdownProvider } from "./context/IsDropdownClicked.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <IsDropdownProvider>
        <Navbar />
        <Routes>
          <Route path="/" index element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets/:petCategory" element={<PetCategory />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </IsDropdownProvider>
    </BrowserRouter>
  </React.StrictMode>
)