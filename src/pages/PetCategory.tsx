import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

export default function PetCategory() {
  const { petCategory } = useParams();
  console.log(petCategory)

  return <div>PetCategory</div>;
}
