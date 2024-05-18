import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PetCard } from "../components/PetCard";

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
          console.log(data.length)
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
    return <div className="text-white">Loading...</div>;
  }
  if (error) {
    return <div className="text-white">{error}</div>;
  }
  return (
    <div>
      <h1 className="text-4xl text-white text-center my-10 uppercase">
        {petCategory}
      </h1>
      <input type="text" className="mx-auto p-2 block mb-8 w-3/4 md:w-2/4 rounded-md" placeholder="search a cat type" onChange={(e) => {
        setSearch(e.target.value);
        setFilteredAnimalArray(animalArray.filter((animal: any) => animal.name.toLowerCase().includes(e.target.value.toLowerCase())));
      }} />
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 w-3/4 mx-auto">
        {search === "" ? (
          animalArray.map((animal: any) => (
            <PetCard key={animal.id} animal={animal} animalType={petCategory!} />
          ))
        ) : (
          filteredAnimalArray.map((animal: any) => (
            <PetCard key={animal.id} animal={animal} animalType={petCategory!} />
          ))
        )}
      </ul>
    </div>
  );
}
