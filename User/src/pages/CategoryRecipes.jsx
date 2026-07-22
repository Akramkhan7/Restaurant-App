import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import RecipeList from "../components/Recipe/RecipeList";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { recipeActions } from "../store/recipeSlice";
import { cartActions } from "../Store/cartSlice";
import { categoryActions } from "../store/categorySlice";

function CategoryRecipes() {
  const { categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const db_url = import.meta.env.VITE_DATABASE_URL;

  const categories = useSelector((state) => state.category.categories);
  const recipes = useSelector((state) => state.recipe.recipes);

  const category = categories.find((cat) => cat.id === categoryId);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchCategories = async () => {
    setCategoryLoading(true);

    try {
      const res = await fetch(`${db_url}/categories.json`);
      const data = await res.json();

      const loadedCategories = [];

      if (data) {
        for (const key in data) {
          loadedCategories.push({
            id: key,
            ...data[key],
          });
        }
      }

      dispatch(categoryActions.setCategories(loadedCategories));
    } catch (err) {
      console.error(err);
    } finally {
      setCategoryLoading(false);
    }
  };

  if (categories.length === 0) {
    fetchCategories();
  }
}, [categories.length, dispatch, db_url]);

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
          (recipe) => recipe.category === category.name,
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


 


  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">
        <button
          onClick={() => history.push("/home")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
        >
          ← Back to Categories
        </button>


       

        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Cooking up some recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="mt-16 rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="text-6xl">🍽️</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              No recipes available
            </h2>
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
