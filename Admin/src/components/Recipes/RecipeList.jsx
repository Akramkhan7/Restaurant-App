import { useState,useEffect } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import RecipeModal from "./RecipeModal";

function RecipeList() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);


  const fetchRecipes = async () => {
  const response = await fetch(
    "https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes.json"
  );

  const data = await response.json();

  const loadedRecipes = [];

  for (const key in data) {
    loadedRecipes.push({
      id: key,
      ...data[key],
    });
  }

  setRecipes(loadedRecipes);
};

const deleteHandler = async (id) => {

  try {
    await fetch(
      `https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes/${id}.json`,
      {
        method: "DELETE",
      }
    );

    fetchRecipes();
    alert("Recipe Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchRecipes();
}, []);

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-md">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Recipes</h2>
            <p className="text-slate-500">Manage your restaurant recipes.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            <FaPlus />
            Add Recipe
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4 text-left">Image</th>
                <th className="px-5 py-4 text-left">Recipe Name</th>
                <th className="px-5 py-4 text-left">Category</th>
                <th className="px-5 py-4 text-left">Ingredients</th>
                <th className="px-5 py-4 text-left">Price</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
  {recipes.map((recipe) => (
    <tr key={recipe.id} className="border-t hover:bg-gray-50">
      <td className="px-5 py-4">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="h-16 w-16 rounded-lg object-cover"
        />
      </td>

      <td className="px-5 py-4 font-medium">
        {recipe.recipeName}
      </td>

      <td className="px-5 py-4">
        {recipe.category}
      </td>

      <td className="max-w-sm px-5 py-4 whitespace-normal">
        {recipe.ingredients}
      </td>

      <td className="px-5 py-4 font-semibold text-green-600">
        ₹{recipe.price}
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setEditRecipe(recipe);
              setShowModal(true);
            }}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => deleteHandler(recipe.id)}
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <RecipeModal
          onClose={() => {
            setShowModal(false);
            setEditRecipe(null);
          }}
          editRecipe={editRecipe}
          fetchRecipes={fetchRecipes}
          
        />
      )}
    </>
  );
}

export default RecipeList;
