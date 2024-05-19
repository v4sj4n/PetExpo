import React from "react";
import { useLocation } from "react-router-dom";


function Contact() {
  const navigate = useLocation();
  return (
    <main className="flex flex-col items-center mt-10 md:mt-20 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="flex text-balance items-center gap-2 flex-col md:flex-row md:gap-6 text-4xl text-center  md:text-5xl mb-6 text-zinc-100">
        Got any questions?
      </h1>
      <p className=" text-lg text-center text-zinc-200/75 leading-6 mb-10">
        let us know
      </p>

      <form
        className="grid grid-cols-2  md:2/5 gap-x-2 gap-y-4"
        onSubmit={(e) => {e.preventDefault()
navigate("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        }}
      >
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full p-2 rounded-md"
            required
          />
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full p-2  rounded-md"
          required
        />
        <label
          htmlFor="animalType"
          className=" col-span-2 flex items-center text-white text-xl gap-2"
        >
          Pet:
          <select
            name="animaltype"
            id=""
            className="rounded-md w-full text-zinc-700 px-2 py-1"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
          </select>
        </label>
        <textarea
          name="problem"
          id="problem"
          className="col-span-2 rounded-md p-2"
          placeholder="Enter the question you have regarding your animal"
          required
        ></textarea>
        <button className="col-span-2 p-2 bg-rose-300 rounded-md text-slate-800 font-bold">
            Submit
        </button>
      </form>
    </main>
  );
}

export default Contact;
