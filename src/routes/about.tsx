import { createFileRoute } from "@tanstack/react-router"
import MapComponent from "@/components/MapComponent"
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md"

export const Route = createFileRoute("/about")({
  component: About,
})

function About() {
  const detailsStyles = "text-white flex gap-2 items-center"
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-4/5 mx-6 mb-16 md:mx-auto">
      <h1 className="text-4xl md:text-5xl text-center text-zinc-100 mb-8">
        About us
      </h1>
      <div className="flex flex-col  md:w-3/4  gap-8">
        <div className="col-span-3 lg:col-span-2">
          <MapComponent />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <h3 className="text-rose-200 text-4xl mb-4">PetExpo</h3>
          <p className={detailsStyles}>
            <MdLocationPin />
            Rruga Muharrem Butka, Tirana 1001, Albania
          </p>
          <p className={detailsStyles}>
            <MdEmail />
            petex@animals.com
          </p>
          <p className={detailsStyles}>
            <MdLocalPhone />
            +35567654321
          </p>
        </div>
      </div>
    </main>
  )
}
