import CategoryItem from "./CategoryItem";

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 3,
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
  },
  {
    id: 4,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  },
  {
    id: 1,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 3,
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
  },
  {
    id: 4,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  },
  {
    id: 1,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 3,
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
  },
  {
    id: 4,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  },
];

function CategoryList() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">
        Browse Categories
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;