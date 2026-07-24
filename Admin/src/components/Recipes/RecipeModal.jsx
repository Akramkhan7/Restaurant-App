import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../store/RecipeSlice";

function RecipeModal({ onClose, editRecipe }) {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editRecipe?.image || "";

      // Upload image to Cloudinary
      if (image) {
        const formData = new FormData();

        formData.append("file", image);
        formData.append("upload_preset", "restaurant-app");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/gckcyscd/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const cloudinaryData = await cloudinaryRes.json();

        imageUrl = cloudinaryData.secure_url;
      }

      const recipeData = {
        recipeName,
        category,
        price,
        ingredients,
        image: imageUrl,
      };

      if (editRecipe) {
        await fetch(
          `https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes/${editRecipe.id}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          },
        );

        dispatch(
          recipeActions.updateRecipe({
            id: editRecipe.id,
            ...recipeData,
          }),
        );

        alert("Recipe Updated Successfully");
      } else {
        const res = await fetch(
          "https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          },
        );
        const data = res.json();

        dispatch(
          recipeActions.addRecipe({
            id: data.name,
            ...recipeData,
          }),
        );

        alert("Recipe Added Successfully");
      }

      onClose();

      setRecipeName("");
      setCategory("");
      setPrice("");
      setIngredients("");
      setImage(null);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (editRecipe) {
      setRecipeName(editRecipe.recipeName);
      setCategory(editRecipe.category);
      setImageUrl(editRecipe.image);
      setIngredients(editRecipe.ingredients);
      setPrice(editRecipe.price);
    }
  }, [editRecipe]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Recipe</h2>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 transition hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-4 p-6">
          {/* Recipe Name & Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Recipe Name
              </label>

              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Enter recipe name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Ingredients
            </label>

            <textarea
              rows="2"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients (comma separated)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Recipe Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-emerald-500 hover:bg-emerald-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-3 h-8 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5m-12-6L12 7.5m0 0l3 3m-3-3V15"
                />
              </svg>

              <span className="font-medium text-gray-700">
                Click to upload image
              </span>

              <span className="mt-1 text-sm text-gray-500">JPG, PNG</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>

            {image && (
              <p className="mt-3 text-sm text-emerald-600">
                Selected: {image.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700"
            >
              {editRecipe ? "Update Recipe" : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeModal;
