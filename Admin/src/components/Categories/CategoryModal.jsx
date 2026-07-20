import { useEffect, useState } from "react";

function CategoryModal({ onClose, editCategory, fetchCategories }) {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://placehold.co/300x300/png?text=Category",
  );

  useEffect(() => {
    if (editCategory) {
      setCategoryName(editCategory.name);
      setImageUrl(editCategory.image);
    } else {
      setCategoryName("");
      setImageUrl("https://placehold.co/300x300/png?text=Category");
    }
  }, [editCategory]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editCategory?.image || "";

      // Upload new image only if one is selected
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

      const categoryData = {
        name: categoryName,
        image: imageUrl,
      };

      if (editCategory) {
        await fetch(
          `https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories/${editCategory.id}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
          },
        );

        alert("Category Updated Successfully");
      } else {
        await fetch(
          "https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
          },
        );

        alert("Category Added Successfully");
      }

      fetchCategories();
      onClose();

      setCategoryName("");
      setImage(null);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold">
          {editCategory ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="mb-2 block font-medium">Category Name</label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Image URL</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full rounded border p-3"
            />
          </div>

          <img
            src={imageUrl}
            alt="Preview"
            className="h-32 w-32 rounded object-cover"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-emerald-600 px-5 py-2 text-white"
            >
              {editCategory ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
