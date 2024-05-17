import React from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export const PetCard = ({
  animal,
  animalType,
}: {
  animal: any;
  animalType: string;
}) => {
  const [showFullCard, setShowFullCard] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden">
      <img src={animal.image} alt="" className="" />
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl">{animal.name}</p>
        {animalType !== "birds" ? (
          <span className="text-white/60">{animal.origin}</span>
        ) : (
          <span className="text-white/60">{animal.place_of_found}</span>
        )}
      </div>
      <a
        className="text-gray-50 block text-end cursor-pointer"
        onClick={() => setShowFullCard((prev) => !prev)}
      >
        More details
      </a>
      {showFullCard && (
        <FullPetCard
          animal={animal}
          animalType={animalType}
          closeCard={() => setShowFullCard((prev) => !prev)}
        />
      )}
    </div>
  );
};

const FullPetCard = ({
  animal,
  animalType,
  closeCard,
}: {
  animal: any;
  animalType: string;
  closeCard: () => void;
}) => {
  console.log(animal);
  return (
    <div className="absolute backdrop-blur-lg rounded-xl bg-white/30 md:w-3/4  h-5/6 top-20 left-0 right-0 mx-auto p-8 ">
      <div className="flex justify-end items-center text-4xl mb-2 text-white">
        <MdClose className="cursor-pointer" onClick={closeCard} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <img src={animal.image} className="col-span-2" alt="" />
        <div className="space-y-2">
          <h3 className="text-5xl font-bold text-white">{animal.name}</h3>
          <p className="text-white/75 text-md text-balance">
            {animal.description}
          </p>
          {animalType !== "birds" ? (
            <p className="text-zinc-700 text-md  font-bold">
              Origin: {animal.origin}
            </p>
          ) : (
            <p className="text-zinc-700 text-md  font-bold">
              Origin: {animal.place_of_found}
            </p>
          )}
          <p className="text-zinc-700 text-md  font-bold">
            Life Span: {animal.life_span}
          </p>
          <p className="text-zinc-700 text-md  font-bold"> Colors: </p>
          <ul className="">
            {animal.colors.map((color) => {
              console.log(color);
              return <li>{color}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
