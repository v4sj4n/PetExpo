import { FaPaw } from "react-icons/fa";
import { PiBirdFill, PiCatFill, PiDogFill } from "react-icons/pi";

export default function App() {
  const animalCategoryClass =
    "w-full p-8 bg-rose-200 rounded-lg flex flex-col items-center justify-center";
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="flex text-balance items-center gap-2 flex-col md:flex-row md:gap-6 text-4xl text-center  md:text-5xl mb-6 text-zinc-100">
        Welcome to our pet universe
        <FaPaw className="rotate-[22.5deg]  text-rose-200" />
      </h1>
      <p className=" text-lg text-center text-zinc-200/75 leading-6 mb-10">
        Welcome to the pet world of your dreams, pick one of the categories
        below and start exploring your favorite pets with details and images.
      </p>

      <div className="grid grid-cols-2 gap-3 w-full mb-8">
        <a href="/pets/dogs">
          <div className={animalCategoryClass}>
            <PiDogFill className="size-20 md:size-36" />
            <h3>dogs.</h3>
          </div>
        </a>
        <a href="/pets/cats">
          <div className={animalCategoryClass}>
            <PiCatFill className="size-20 md:size-36" />

            <h3>cats.</h3>
          </div>
        </a>
        <a href="/pets/birds" className="col-span-2 ">
          <div className={animalCategoryClass}>
            <PiBirdFill className="size-20 md:size-36" />
            <h3>birds.</h3>
          </div>
        </a>
      </div>
    </main>
  );
}
