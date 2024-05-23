import { Animal } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

function DeleteEntry({ animal, close }: { animal: Animal; close: () => void }) {
  const queryClient = useQueryClient()

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(
          `http://localhost:4444/api/pets/${animal._id}`
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

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed top-0 left-0  bg-black/10 backdrop-blur-sm grid  h-full w-full "
      onClick={close}
    >
      {!isSuccess && !error ? (
        <div
          className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10"
          onClick={stopPropagation}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              mutate()
            }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-white">
                Are you sure you want to delete {animal.name}?
              </h1>
              <img
                src={`${animal.image}?q=10`}
                alt={`${animal.name} image`}
                className="size-40 object-cover mx-auto"
              />
              <div className="flex">
                <button
                  className=" text-white p-2 rounded-md w-full"
                  type="button"
                  onClick={close}
                >
                  cancel
                </button>
                <button
                  className="bg-red-300 text-black font-bold p-2 rounded-md w-full"
                  type="submit"
                >
                  Delete
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
          <p className="text-green-300">The deletion was succesful!</p>
        </div>
      ) : (
        <div
          onClick={stopPropagation}
          className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
        >
          <p className="text-red-300">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}

export default DeleteEntry
