import { MouseEvent, useState } from "react"
import { Animal } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

function CreateEntry({ close }: { close: () => void }) {
  const queryClient = useQueryClient()
  const [animalToCreate, setAnimalToCreate] = useState<Animal>({
    name: "",
    origin: "",
    description: "",
    image: "",
    colors: [""],
    category: "dog",
  })

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: async (animalToCreate: Animal) => {
      try {
        const res = await axios.post(
          `http://localhost:4444/api/pets/`,
          animalToCreate
        )
        return res.data
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message)
        } else {
          throw new Error("An unknown error occurred")
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["petsListAdmin"] })
      setTimeout(() => {
        close()
      }, 1234)
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["petsListAdmin"] })
      setTimeout(() => {
        close()
      }, 1234)
    },
  })

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed top-0 left-0  bg-black/50 backdrop-blur-md grid  h-full w-full "
      onClick={close}
    >
      {!isSuccess && !error ? (
        <div
          className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
          onClick={stopPropagation}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutate(animalToCreate)
            }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-white">Edit your pet:</h1>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="name">
                  <span className="text-xl text-white">Name:</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={animalToCreate.name}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        name: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2"
                  />
                </label>
                <label htmlFor="origin">
                  <span className="text-xl text-white">Origin:</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={animalToCreate.origin}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        origin: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2"
                  />
                </label>
                <label htmlFor="origin" className="col-span-2">
                  <span className="text-xl text-white">Imageurl:</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={animalToCreate.image}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        image: e.target.value,
                      })
                    }}
                    className="w-full rounded-md p-2"
                  />
                </label>
                <label htmlFor="desc" className="col-span-2">
                  <span className="text-xl text-white">Description:</span>

                  <textarea
                    name="description"
                    id="description"
                    className=" rounded-md p-2  w-full resize-none leading-5"
                    value={animalToCreate.description}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        description: e.target.value,
                      })
                    }}
                  ></textarea>
                </label>
                <label htmlFor="colors" className="col-span-2">
                  <span className="text-xl text-white">Colors:</span>
                  <span>seperate by commas</span>
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    value={animalToCreate.colors.join(", ")}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        colors: e.target.value
                          .split(",")
                          .map((color) => color.trim()),
                      })
                    }}
                    className="w-full rounded-md p-2"
                  />
                </label>
                <label htmlFor="petCategory" className="col-span-2">
                  <span className="text-xl text-white">Pet:</span>

                  <select
                    name="pet"
                    id="pet"
                    defaultValue={animalToCreate.category}
                    onChange={(e) => {
                      setAnimalToCreate({
                        ...animalToCreate,
                        category: e.target.value,
                      })
                    }}
                    className="w-full p-2 rounded-md"
                  >
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                    <option value="bird">bird</option>
                  </select>
                </label>
              </div>
              <div className="flex">
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
        </div>
      ) : isSuccess ? (
        <div
          onClick={stopPropagation}
          className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
        >
          <p className="text-green-300">The creation was succesful!</p>
        </div>
      ) : (
        <div
          onClick={stopPropagation}
          className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
        >
          <p className="text-red-300">Error: {error?.message}</p>
        </div>
      )}
    </div>
  )
}

export default CreateEntry
