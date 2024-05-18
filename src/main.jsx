import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PetCategory from "./pages/PetCategory";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets/:petCategory" element={<PetCategory />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
