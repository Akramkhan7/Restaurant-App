function CategoryItem({ category }) {
  return (
    <div className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">
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
    </div>
  );
}

export default CategoryItem;