import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Animal } from "@/types"

export const adminQueryKey = ["petsListAdmin"]

export const readEntries = async (
  setEntries: React.Dispatch<React.SetStateAction<Animal[]>>
) => {
  const res = await axios.get("http://localhost:4444/api/pets")
  setEntries(res.data)
  return res.data
}

export const createEntry = async (animalToCreate: Animal) => {
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
}

export const deleteEntry = async (id: string) => {
  try {
    const res = await axios.delete(`http://localhost:4444/api/pets/${id}`)
    return res.data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export const editEntry = async (animalToCreate: Animal, id: string) => {
  try {
    const res = await axios.put(
      `http://localhost:4444/api/pets/${id}`,
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
}

export const afterHandlerHelper = (cq: QueryClient, close: () => void) => {
  cq.invalidateQueries({ queryKey: adminQueryKey })
  setTimeout(() => {
    close()
  }, 1234)
}
