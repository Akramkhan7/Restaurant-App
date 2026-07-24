import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import RecipeModal from "./RecipeModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, recipeActions } from "../../store/RecipeSlice";

function RecipeList() {
  const [showModal, setShowModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const dispatch = useDispatch();

  const { recipes, loading } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    try {
      await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes/${id}.json`,
        {
          method: "DELETE",
        },
      );

      dispatch(recipeActions.deleteRecipe(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Recipes</h1>
            <p className="text-sm text-slate-500">Manage your food recipes</p>
          </div>

          <button
            onClick={() => {
              setEditRecipe(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            <FaPlus />
            Add Recipe
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
            <FaSearch className="mx-auto text-4xl text-slate-400" />

            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No Recipes Found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start by adding your first recipe.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img
                  src={recipe.image}
                  alt={recipe.recipeName}
                  className="h-48 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-4">
                  {/* Name & Price */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {recipe.recipeName}
                    </h2>

                    <span className="whitespace-nowrap font-semibold text-blue-600">
                      ₹{recipe.price}
                    </span>
                  </div>

                  <span className="mt-3 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {recipe.category}
                  </span>

                  <div className="mt-4 min-h-[80px]">
                    <p className="line-clamp-3 text-sm text-slate-500">
                      {recipe.ingredients}
                    </p>
                  </div>

                  <div className="mt-auto flex gap-3 pt-5">
                    <button
                      onClick={() => {
                        setEditRecipe(recipe);
                        setShowModal(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-blue-600 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteHandler(recipe.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-red-500 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
