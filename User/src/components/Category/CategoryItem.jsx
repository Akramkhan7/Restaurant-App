import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CategoryItem({ category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-center text-lg font-semibold text-slate-800">
          {category.name}
        </h2>
      </div>
    </Link>
  );
}

export default CategoryItem;
