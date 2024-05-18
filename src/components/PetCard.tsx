import React from "react";
import { useState } from "react";
import {
  MdClose,
  MdOutlineInvertColors,
  MdLocationPin,
  MdOutlineHeight,
} from "react-icons/md";
import { FaTree, FaKiwiBird } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoMdClock } from "react-icons/io";

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
      <img 
      src={`${
        animalType === "dogs"
          ? "/dog.png"
          : animalType === "cats"
          ? "/cat.png"
          : "/bird.png"
      }`}
      alt="" className="" />
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
    <div
      className="fixed top-0 left-0 h-screen w-full bg-transparent z-0"
      onClick={closeCard}
    >
      <div
        className="fixed z-50 backdrop-blur-md rounded-xl bg-zinc-800 md:w-3/12 top-20 left-0 right-0 md:mx-auto pt-4 pb-6 px-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center text-2xl mb-2 text-white">
          <MdClose className="cursor-pointer" onClick={closeCard} />
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4  items-start md:items-center">
            <img
              src={`${
                animalType === "dogs"
                  ? "/dog.png"
                  : animalType === "cats"
                  ? "/cat.png"
                  : "/bird.png"
              }`}
              className="size-40 md:size-16 rounded-md"
              alt={animal.name.slice(0,3)}
            />
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {animal.name}
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-white/75 text-md text-balance">
              {animal.description}{" "}
              {animal.origin && animalType === "dogs" ? (
                <>
                  Originated from{" "}
                  <span className="font-bold">{animal.origin}</span>
                </>
              ) : (
                ""
              )}
            </p>

            {animalType === "birds" ? (
              <>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdLocationPin className="text-2xl" />
                  {animal.place_of_found}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <GiForkKnifeSpoon className="text-2xl" />
                  {animal.diet}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <FaTree className="text-2xl" />
                  {animal.habitat}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <FaKiwiBird className="text-2xl" />
                  {animal.species}, {animal.family}
                </p>
              </>
            ) : animalType === "cats" ? (
              <>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  {animal.temperament}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdLocationPin className="text-2xl" />
                  <span className="font-bold">{animal.origin}</span>
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdOutlineInvertColors className="text-2xl" />
                  <span className="">
                    {animal.colors.map((color, id) => {
                      return `${color}${
                        animal.colors.length - 1 !== id ? ", " : ""
                      }`;
                    })}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  {animal.temperament}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdLocationPin className="text-2xl" />
                  <span className="font-bold">{animal.origin}</span>
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdOutlineInvertColors className="text-2xl" />

                  {animal.colors.map((color, id) => {
                    return `${color}${
                      animal.colors.length - 1 !== id ? ", " : ""
                    }`;
                  })}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <MdOutlineHeight className="text-2xl" />
                  {animal.size}
                </p>
                <p className="text-slate-300 text-md font-bold flex items-center gap-2">
                  <IoMdClock className="text-2xl" />
                  {animal.lifespan}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
