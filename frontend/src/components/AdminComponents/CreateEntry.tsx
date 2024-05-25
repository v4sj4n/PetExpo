import { useState } from "react"
import { Animal } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { afterHandlerHelper, createEntry } from "../../utils/AdminApiHandlers"

function CreateEntry({ close }: { close: () => void }) {
  const queryClient = useQueryClient()
  const [animalToCreate, setAnimalToCreate] = useState<Animal>({
    name: "",
    origin: "",
    description: "",
    image: "",
    colors: [""],
    category: "",
  })

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: (animalToCreate: Animal) => createEntry(animalToCreate),
    onSuccess: () => afterHandlerHelper(queryClient, close),
    onError: () => afterHandlerHelper(queryClient, close),
  })

  return (
    <div
      className="fixed top-0 left-0  bg-black/50 backdrop-blur-md grid  h-full w-full "
      onClick={close}
    >
      <div
        className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess && !error ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutate(animalToCreate)
            }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl mb-2 font-bold text-white">
                Edit your pet:
              </h1>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="name">
                  <span className="text-xl text-white">Name:</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your pet name"
                    required
                    value={animalToCreate.name}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        name: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2 border-white/25 border-2  bg-zinc-800 text-white"
                  />
                </label>
                <label htmlFor="origin">
                  <span className="text-xl text-white">Origin:</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your pet origin"
                    required
                    value={animalToCreate.origin}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        origin: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2 border-white/25 border-2  bg-zinc-800 text-white"
                  />
                </label>
                <label htmlFor="origin" className="col-span-2">
                  <span className="text-xl text-white">Imageurl:</span>
                  <input
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    placeholder="Enter your pet image URL"
                    required
                    value={animalToCreate.image}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        image: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2 border-white/25 border-2  bg-zinc-800 text-white"
                  />
                </label>
                <label htmlFor="desc" className="col-span-2">
                  <span className="text-xl text-white">Description:</span>

                  <textarea
                    name="description"
                    id="description"
                    className=" rounded-md p-2  w-full resize-none leading-5 border-white/25 border-2  bg-zinc-800 text-white"
                    required
                    value={animalToCreate.description}
                    rows={3}
                    placeholder="Enter your pet description"
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        description: e.target.value,
                      })
                    }}
                  ></textarea>
                </label>
                <label htmlFor="colors" className="col-span-2">
                  <span className="text-xl text-white">Colors: </span>
                  <span className="text-white text-xs">seperate by commas</span>
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    required
                    value={animalToCreate.colors.join(", ")}
                    placeholder="Enter your pet colors"
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        colors: e.target.value
                          .split(",")
                          .map((color) => color.trim()),
                      })
                    }}
                    className="w-full rounded-md p-2 border-white/25 border-2  bg-zinc-800 text-white"
                  />
                </label>
                <label htmlFor="petCategory" className="col-span-2">
                  <span className="text-xl text-white">Pet:</span>
                  <select
                    name="pet"
                    id="pet"
                    defaultValue={animalToCreate.category}
                    value={animalToCreate.category || ""}
                    required
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        category: e.target.value,
                      })
                    }}
                    className="w-full p-2 rounded-md border-white/25 border-2  bg-zinc-800 text-white"
                  >
                    <option value="" disabled>
                      Select a pet
                    </option>
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                    <option value="bird">bird</option>
                  </select>
                </label>
              </div>
              <div className="flex mt-2">
                <button
                  className=" text-white p-2 rounded-md w-full"
                  type="button"
                  onClick={close}
                >
                  cancel
                </button>
                <button
                  className="bg-green-300 text-black font-bold p-2 rounded-md w-full"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : isSuccess ? (
          <p className="text-green-300">The creation was succesful!</p>
        ) : (
          <p className="text-red-300">Error: {error?.message}</p>
        )}
      </div>
    </div>
  )
}

export default CreateEntry
