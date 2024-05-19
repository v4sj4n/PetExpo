import { FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Animal } from "../../types";

function EditEntry({ animal, close }: { animal: Animal; close: () => void }) {
  const [updatedAnimal, setUpdatedAnimal] = useState<Animal>(animal);
  const navigate = useNavigate();

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4444/api/pets/${animal._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAnimal),
    });
    if (res.ok) {
      console.log("Updated");
      navigate(0);
    }
  };

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0  bg-black/50 backdrop-blur-md grid  h-full w-full "
      onClick={close}
    >
      <div
        className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-10 rounded-lg"
        onClick={stopPropagation}
      >
        <form onSubmit={onHandleSubmit}>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-white">Edit your pet:</h1>
            <img
              src={`${animal.image}?q=10`}
              alt={`${animal.name} image`}
              className="size-40 object-cover mx-auto"
            />
            <div className="grid grid-cols-2 gap-2">
              <label htmlFor="name">
                <span className="text-xl text-white">Name:</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedAnimal.name}
                  onChange={(e) => {
                    setUpdatedAnimal({
                      ...updatedAnimal,
                      name: e.target.value,
                    });
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
                  value={updatedAnimal.origin}
                  onChange={(e) => {
                    setUpdatedAnimal({
                      ...updatedAnimal,
                      origin: e.target.value,
                    });
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
                  value={updatedAnimal.description}
                  onChange={(e) => {
                    setUpdatedAnimal({
                      ...updatedAnimal,
                      description: e.target.value,
                    });
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
                  value={updatedAnimal.colors.join(", ")}
                  onChange={(e) => {
                    setUpdatedAnimal({
                      ...updatedAnimal,
                      colors: e.target.value
                        .split(",")
                        .map((color) => color.trim()),
                    });
                  }}
                  className="w-full rounded-md p-2"
                />
              </label>
              <label htmlFor="petCategory" className="col-span-2">
                <span className="text-xl text-white">Pet:</span>

                <select
                  name="pet"
                  id="pet"
                  defaultValue={animal.category}
                  onChange={(e) => {
                    setUpdatedAnimal({
                      ...updatedAnimal,
                      category: e.target.value,
                    });
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
    </div>
  );
}

export default EditEntry;
