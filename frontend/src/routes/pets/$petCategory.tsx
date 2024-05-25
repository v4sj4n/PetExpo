import { createFileRoute, notFound } from "@tanstack/react-router"
import { useContext, useState } from "react"
import { PetCard } from "@/components/PetCard"
import { IsDropdownClickedContext } from "@/context/IsDropdownClicked"
import { Animal } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/utils/useDebounce"

export const Route = createFileRoute("/pets/$petCategory")({
  component: PetCategory,
  loader: async ({ params }) => {
    if (!["dogs", "cats", "birds"].includes(params.petCategory)) {
      throw notFound()
    }
  },
})

export default function PetCategory() {
  const { isClicked, isHidden } = useContext(IsDropdownClickedContext)
  const { petCategory } = Route.useParams()
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search)

  const inputStyles =
    "left-0 right-0 sticky  mx-auto p-3 block mb-8 w-full md:w-2/4 rounded-md shadow-md border-white/25 border-2 bg-zinc-800 text-white"

  const {
    data: animalArray,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      console.log(debouncedSearch)
      const queryToFetch = debouncedSearch ? `&search=${debouncedSearch}` : ""
      const res = await fetch(
        `http://localhost:4444/api/pets?category=${
          petCategory !== "birds"
            ? petCategory?.slice(0, 3)
            : petCategory?.slice(0, 4)
        }${queryToFetch}`
      )

      const data = await res.json()
      return data
    },
    queryKey: ["pets", debouncedSearch, petCategory],
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
    <main className="flex flex-col items-center mt-4 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="text-4xl text-white font-bold text-center my-10 uppercase">
        {petCategory}
      </h1>

      <input
        type="text"
        className={`${
          isClicked && !isHidden ? "top-44" : !isHidden ? "top-20" : "top-4"
        } ${inputStyles} `}
        placeholder={`Search through the ${petCategory} list`}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        value={search}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 mx-auto">
        {animalArray.map((animal: Animal, index: number) => (
          <PetCard index={index} animal={animal} animalType={petCategory!} />
        ))}
      </div>
    </main>
  )
}