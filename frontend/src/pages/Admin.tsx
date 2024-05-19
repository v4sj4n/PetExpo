import { useState } from "react";
import { Animal } from "../types";
import { useEffect } from "react";
import DeleteEntry from "../components/AdminComponents/DeleteEntry";
import EditEntry from "../components/AdminComponents/EditEntry";

function Admin() {
  const [animalArray, setAnimalArray] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activateDelete, setActivateDelete] = useState<boolean>(false);
  const [activateEdit, setActivateEdit] = useState<boolean>(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  //   const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const fetchPetCategory = async () => {
      try {
        const res = await fetch(`http://localhost:4444/api/pets/`);
        const data = await res.json();
        setAnimalArray(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchPetCategory();
  }, []);

  const handleSort = (field: string) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

const sortedArray = [...animalArray].sort((a, b) => {
  const key = field as keyof Animal;

  if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
  if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
  return 0;
});

    setAnimalArray(sortedArray);
  };

  if (loading) {
    return (
      <div className="text-4xl text-white text-center my-10 uppercase">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-4xl text-white text-center my-10 uppercase">
        {error}
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center mt-10 md:mt-12 md:w-3/4 mx-6 md:mx-auto">
      <h1 className="flex text-balance items-center gap-2 flex-col md:flex-row md:gap-6 text-4xl text-center  md:text-5xl mb-8 text-rose-200">
        Admin Page
      </h1>

      {activateDelete && (
        <DeleteEntry
          close={() => {
            setActivateDelete(false);
            setSelectedAnimal(null);
          }}
          animal={selectedAnimal!}
        />
      )}
      {activateEdit && (
        <EditEntry
          close={() => {
            setActivateEdit(false);
            setSelectedAnimal(null);
          }}
          animal={selectedAnimal!}
        />
      )}
      <table className="border-2 rounded-lg w-full ">
        <thead className="text-white text-2xl">
          <tr>
            <th>
              <button onClick={() => handleSort("name")}>name</button>
            </th>
            <th>
              <button onClick={() => handleSort("origin")}>location</button>
            </th>
            <th>description</th>
            <th>
              <button onClick={() => handleSort("category")}>category</button>
            </th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {animalArray.map((animal) => {
            return (
              <tr key={animal._id}>
                <td className="text-center">{animal.name}</td>
                <td className="text-center">{animal.origin}</td>
                <td className="text-left">{animal.description}</td>
                <td className="text-center">{animal.category}</td>
                <td>
                  <div className="flex">
                    <button
                      className="text-white px-2 py-1 rounded-md"
                      onClick={() => {
                        setSelectedAnimal(animal);
                        setActivateEdit(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-rose-300 text-black px-2 py-1 rounded-md"
                      onClick={() => {
                        setSelectedAnimal(animal);
                        setActivateDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Admin;