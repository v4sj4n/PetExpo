import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { PetCard } from "../components/PetCard"
import { Animal } from "../types"
import { IsDropdownClickedContext } from "../context/IsDropdownClicked"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "../utils/useDebounce"

export default function PetCategory() {
  const { isClicked, isHidden } = useContext(IsDropdownClickedContext)
  const { petCategory } = useParams()
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search)

  const {
    data: animalArray,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      console.log(debouncedSearch)
      const queryToFetch = debouncedSearch ? `?search=${debouncedSearch}` : ""
      const res = await fetch(
        `https://freetestapi.com/api/v1/${petCategory}${queryToFetch}`
      )

      const data = await res.json()
      return data
    },
    queryKey: ["pets", debouncedSearch],
    enabled: !!(debouncedSearch.length >= 0),
  })

  if (isLoading) {
    return (
      <div className="text-4xl text-white text-center my-10 uppercase">
        Loading...
      </div>
    )
  }
  if (error) {
    return (
      <div className="text-4xl text-white text-center my-10 uppercase">
        {error.message}
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-4xl text-white text-center my-10 uppercase">
        {petCategory}
      </h1>
      <input
        type="text"
        className={`${
          isClicked && !isHidden ? "top-44" : !isHidden ? "top-20" : "top-4"
        } left-0 right-0 sticky  mx-auto p-3 block mb-8 w-3/4 md:w-2/4 rounded-md `}
        placeholder={`Search through the ${petCategory} list`}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        value={search}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 w-3/4 mx-auto">
        {animalArray!.map((animal: Animal, index: number) => (
          <PetCard
            key={animal.id}
            index={index}
            animal={animal}
            animalType={petCategory!}
          />
        ))}
      </div>
    </div>
  )
}
