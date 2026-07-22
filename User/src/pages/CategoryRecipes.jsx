import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import RecipeList from "../components/Recipe/RecipeList";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { recipeActions } from "../store/recipeSlice";

function CategoryRecipes() {
  const { categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const db_url = import.meta.env.VITE_DATABASE_URL;

  const categories = useSelector((state) => state.category.categories);
  const recipes = useSelector((state) => state.recipe.recipes);

  const category = categories.find((cat) => cat.id === categoryId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchRecipes = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${db_url}/recipes.json`);

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();

        const loadedRecipes = [];

        if (data) {
          for (const key in data) {
            loadedRecipes.push({
              id: key,
              ...data[key],
            });
          }
        }

        const filteredRecipes = loadedRecipes.filter(
          (recipe) => recipe.category === category.name
        );

        dispatch(recipeActions.setRecipes(filteredRecipes));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryId, category, dispatch, db_url]);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Category not found 😕
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <button
          onClick={() => history.push("/home")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
        >
          ← Back to Categories
        </button>

        <h1 className="text-4xl font-bold text-slate-800">
          {category.name}
        </h1>

        <p className="mt-2 text-slate-500">
          Explore our delicious {category.name} recipes.
        </p>

        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">
              Cooking up some recipes...
            </p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="mt-16 rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="text-6xl">🍽️</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              No recipes available
            </h2>

            <p className="mt-2 text-gray-500">
              Looks like our chefs haven't added any {category.name} recipes
              yet.
            </p>

            <button
              onClick={() => history.push("/home")}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Browse Other Categories
            </button>
          </div>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryRecipes;