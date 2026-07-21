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
      <div className="rounded-xl bg-white p-6 shadow-md">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Recipes</h1>
            <p className="mt-1 text-slate-500">Manage your food recipes.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            <FaPlus />
            Add Recipe
          </button>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-xl border border-slate-200">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[80px_1fr_140px_1.5fr_100px_120px] items-center gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>Image</span>
            <span>Recipe Name</span>
            <span>Category</span>
            <span>Ingredients</span>
            <span>Price</span>
            <span className="text-center">Actions</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : recipes.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="grid grid-cols-[80px_1fr_auto] gap-4 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[80px_1fr_140px_1.5fr_100px_120px] md:items-center"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.recipeName}
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200"
                  />

                  <span className="font-medium text-slate-800">
                    {recipe.recipeName}
                  </span>

                  <span className="hidden md:block">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {recipe.category}
                    </span>
                  </span>

                  <span
                    className="hidden truncate text-slate-600 md:block"
                    title={recipe.ingredients}
                  >
                    {recipe.ingredients}
                  </span>

                  <span className="hidden font-semibold text-emerald-600 md:block">
                    ₹{recipe.price}
                  </span>

                  <div className="col-start-3 row-start-1 flex justify-end gap-3 md:col-auto md:row-auto md:justify-center">
                    <button
                      onClick={() => {
                        setEditRecipe(recipe);
                        setShowModal(true);
                      }}
                      className="rounded-lg bg-blue-100 p-3 text-blue-600 transition hover:bg-blue-200"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteHandler(recipe.id)}
                      className="rounded-lg bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="col-span-2 flex flex-wrap items-center gap-2 md:hidden">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {recipe.category}
                    </span>

                    <span className="font-semibold text-emerald-600">
                      ₹{recipe.price}
                    </span>
                  </div>

                  <p className="col-span-2 truncate text-sm text-slate-500 md:hidden">
                    {recipe.ingredients}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-lg font-semibold text-slate-600">
                No recipes found
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Click <strong>Add Recipe</strong> to create your first recipe.
              </p>
            </div>
          )}
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
