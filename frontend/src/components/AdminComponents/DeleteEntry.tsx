import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Animal } from "../../types";

function DeleteEntry({ animal, close }: { animal: Animal; close: () => void }) {
  const navigate = useNavigate();

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4444/api/pets/${animal._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("Deleted");
      navigate(0);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0  bg-black/50 grid  h-full w-full "
      onClick={close}
    >
      <div
        className="fixed bg-zinc-800 p-8 left-0 right-0 mx-auto w-fit top-1/3"
        onClick={stopPropagation}
      >
        <form onSubmit={onHandleSubmit}>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-white">
              Are you sure you want to delete {animal.name}?
            </h1>
            <img
              src={`${animal.image}?q=10`}
              alt={`${animal.name} image`}
              className="size-40 object-cover mx-auto"
            />
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteEntry;
