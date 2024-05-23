import { useEffect, useState } from "react"

export const useDebounce = (search: string, delay: number = 500) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setDebouncedSearch(search)
    }, delay)

    return () => clearTimeout(delaySearch)
  }, [search])

  return debouncedSearch
}
