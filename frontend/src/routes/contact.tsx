import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/contact")({
  component: Contact,
})

function Contact() {
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="flex text-balance items-center gap-2 flex-col md:flex-row md:gap-6   text-4xl text-center  md:text-5xl mb-3 md:mb-4 text-zinc-100">
        Got any questions?
      </h1>
      <p className=" text-lg text-center text-zinc-200/75 leading-6 mb-10">
        let us know
      </p>

      <form
        className="grid grid-cols-2 gap-x-2 gap-y-4 md:w-2/4"
        onSubmit={(e) => {
          e.preventDefault()
          e.currentTarget.reset()
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }}
      >
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full p-2 rounded-md border-white/25 border-2  bg-zinc-800 text-white"
            required
          />
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full p-2  rounded-md border-white/25 border-2  bg-zinc-800 text-white"
          required
        />
        <label
          htmlFor="animalType"
          className=" col-span-2 flex items-center text-white text-xl gap-2"
        >
          Pet:
          <select
            name="animaltype"
            value={""}
            id=""
            className="rounded-md w-full px-2 py-1 border-white/25 border-2  bg-zinc-800 text-white"
            required
          >
            <option value="" disabled>Select a pet</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
          </select>
        </label>
        <textarea
          name="problem"
          id="problem"
          className="col-span-2 rounded-md p-2 border-white/25 border-2  bg-zinc-800 text-white"
          placeholder="Describe your question"
          rows={4}
          required
        ></textarea>
        <button className="col-span-2 p-2 bg-rose-300 rounded-md text-slate-800 font-bold">
          Submit
        </button>
      </form>
    </main>
  )
}