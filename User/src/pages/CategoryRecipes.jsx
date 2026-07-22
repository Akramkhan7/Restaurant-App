import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import RecipeList from "../components/Recipe/RecipeList";

function CategoryRecipes() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold text-slate-800">Pizza</h1>

        <p className="mt-2 text-slate-500">
          Explore our delicious pizza recipes.
        </p>

        <RecipeList />
      </div>

      <Footer />
    </div>
  );
}

export default CategoryRecipes;