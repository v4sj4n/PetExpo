import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar.tsx';
import PetCategory from './pages/PetCategory.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<App />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/pets/:petCategory" element={<PetCategory />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
