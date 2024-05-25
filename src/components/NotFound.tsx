import { Link } from "@tanstack/react-router"

export const NotFound = () => {
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="text-4xl text-white font-extrabold text-center my-10 uppercase">
        Page does not exist
      </h1>
      <p className="text-white text-center">
        Please check the URL or go to the{" "}
        <Link to="/" className="hover:underline font-bold">
          homepage
        </Link>
      </p>
    </main>
  )
}
