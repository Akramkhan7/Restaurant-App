import RecipeCard from "./RecipeCard";

const recipes = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 299,
    rating: 4.8,
    time: "20 mins",
    description:
      "Classic Italian pizza with fresh mozzarella, basil and tomato sauce.",
    ingredients: ["Cheese", "Tomato", "Basil", "Olives"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
  {
    id: 2,
    name: "Veggie Pizza",
    price: 349,
    rating: 4.7,
    time: "25 mins",
    description:
      "Loaded with fresh vegetables, cheese and signature pizza sauce.",
    ingredients: ["Capsicum", "Onion", "Corn", "Cheese"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
];

function RecipeList() {
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;