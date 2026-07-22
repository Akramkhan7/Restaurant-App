import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const categories = useSelector((state) => state.category.categories);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">
        Browse Categories
      </h2>

      {categories.length === 0 ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryList;