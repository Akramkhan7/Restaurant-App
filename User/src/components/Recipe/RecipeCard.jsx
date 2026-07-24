import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { toast } from "react-toastify";

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const addToCarHandler = () =>{
    dispatch(cartActions.addToCart(recipe));
    toast.success('Item added to cart.')
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <img
        src={recipe.image}
        alt={recipe.recipeName}
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {recipe.recipeName}
          </h2>

          <span className="text-xl font-bold text-blue-600">
            ₹{recipe.price}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {recipe.ingredients
            ?.split(",")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <span
                key={index}
                className="rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {item.trim()}
              </span>
            ))}
        </div>

        <button
          onClick={addToCarHandler}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <FaShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;