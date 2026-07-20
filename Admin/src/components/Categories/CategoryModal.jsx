import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, DATABASE_URL } from "../../services/firebase";

function CategoryModal({ onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState('https://placehold.co/300x300/png?text=Category');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!categoryName || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", "restaurant-app"); // Your upload preset name

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/gckcyscd/image/upload",
        formData,
      );

        const imageUrl = cloudinaryResponse.data.secure_url;
      // Save category to Realtime Database
      await axios.post(`${DATABASE_URL}/categories.json`, {
        name: categoryName,
        image: imageUrl,
      });

      alert("Category Added Successfully");

      setCategoryName("");
      setImage(null);
      onClose();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Add Category</h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
