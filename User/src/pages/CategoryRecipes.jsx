import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import RecipeList from "../components/Recipe/RecipeList";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "../store/recipeSlice";
import { fetchCategories } from "../store/categorySlice";

function CategoryRecipes() {
  const { categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const categoryLoading = useSelector((state) => state.category.loading);

  const recipes = useSelector((state) => state.recipe.recipes);
  const recipeLoading = useSelector((state) => state.recipe.loading);
  const loading = categoryLoading || recipeLoading;

  const category = categories.find((cat) => cat.id === categoryId);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (category) {
      dispatch(fetchRecipes(category.name));
    }
  }, [dispatch, category]);

  if (loading || !category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
  {/* pt-8 + relative z-0 ensures this content sits below the sticky header,
      never overlapping it, even during scroll-restore on refresh */}
  <div className="relative z-0 mx-auto max-w-7xl px-6 pt-8 pb-10">
    <button
      onClick={() => history.push("/home")}
      className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
    >
      ← Back to Categories
    </button>

    {loading ? (
      <div className="mt-16 flex flex-col items-center justify-center gap-3 text-slate-500">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
        <p className="text-sm">Loading recipes...</p>
      </div>
    ) : recipes.length === 0 ? (
      <div className="mt-16 rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
        <div className="text-6xl">🍽️</div>
        <h2 className="mt-4 text-2xl font-bold text-gray-700">
          No recipes available
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Try checking back later or browse another category.
        </p>
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
