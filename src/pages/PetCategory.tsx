import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PetCard } from "../components/PetCard";
import { motion } from "framer-motion";

export default function PetCategory() {
  const [animalArray, setAnimalArray] = useState([]);
  const [filteredAnimalArray, setFilteredAnimalArray] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { petCategory } = useParams();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    if (
      petCategory === "dogs" ||
      petCategory === "cats" ||
      petCategory === "birds"
    ) {
      const fetchPetCategory = async () => {
        try {
          const res = await fetch(
            `https://freetestapi.com/api/v1/${petCategory}`
          );
          const data = await res.json();
          console.log(data.length);
          setAnimalArray(data);
          setLoading(false);
        } catch (err) {
          setError("Error fetching data");
          setLoading(false);
        }
      };
      fetchPetCategory();
    } else {
      setLoading(false);
      setError("Invalid Category");
    }
  }, []);

  if (loading) {
    return <div className="text-4xl text-white text-center my-10 uppercase">Loading...</div>;
  }
  if (error) {
    return <div className="text-4xl text-white text-center my-10 uppercase">{error}</div>;
  }
  return (
<div>
  <h1 className="text-4xl text-white text-center my-10 uppercase">
    {petCategory}
  </h1>
  <input
    type="text"
    className="sticky top-20 left-0 right-0   mx-auto z-10 p-2 block mb-8 w-3/4 md:w-2/4 rounded-md"
    placeholder={`Search a ${petCategory !== "birds" ? petCategory?.slice(0,3) : petCategory.slice(0,4)} type`}
    onChange={(e) => {
      setSearch(e.target.value);
      setFilteredAnimalArray(
        animalArray.filter((animal: any) =>
          animal.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }}
  />
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 w-3/4 mx-auto">
    {search === ""
      ? animalArray.map((animal: any, index: number) => (
          <motion.div
            key={animal.id}
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <PetCard
              key={animal.id}
              animal={animal}
              animalType={petCategory!}
            />
          </motion.div>
        ))
      : filteredAnimalArray.map((animal: any, index: number) => (
          <motion.div
            key={animal.id}
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PetCard
              key={animal.id}
              animal={animal}
              animalType={petCategory!}
            />
          </motion.div>
        ))}
  </div>
</div>

  );
}