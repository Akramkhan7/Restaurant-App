import { FaClock, FaShoppingCart, FaStar } from "react-icons/fa";

function RecipeCard({ recipe }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        {/* Name */}
        <h2 className="text-xl font-bold text-slate-800">
          {recipe.name}
        </h2>

        {/* Price & Rating */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₹{recipe.price}
          </span>

         
        </div>


        {/* Ingredients */}
        <div className="mt-5">
          <h3 className="mb-2 font-semibold text-slate-700">
            Ingredients
          </h3>

          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

     

        {/* Add To Cart */}
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;