import React from "react";
export const PetCard = ({ animal }: { animal: any }) => {
  console.log(animal);
  return (
    <div className="rounded-xl overflow-hidden">
      <img src={animal.image} alt="" className="" />
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl">{animal.name}</p>
        <span className="text-white/60">{animal.origin}</span>
      </div>
    </div>
  );
};
