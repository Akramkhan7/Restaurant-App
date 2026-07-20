import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import CategoryModal from "./CategoryModal";

function CategoryList() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories.json`,
        {
          method: "GET",
        },
      );

      const data = await res.json();

      let loadedCategories = [];
      for (const key in data) {
        loadedCategories.push({
          id: key,
          ...data[key],
        });
      }

      setCategories(loadedCategories);
    } catch (err) {}
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories/${id}.json`,
        {
          method: "DELETE",
        },
      );

      console.log("doen");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = async (id) => {};

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Categories</h1>

            <p className="text-slate-500 mt-1">Manage your food categories.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

        {/* Search */}

        <div className="relative max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search category..."
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>

                <th className="px-6 py-4 text-left">Category</th>

                <th className="px-6 py-4 text-left">Recipes</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((category) => (
                <tr key={category.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">{category.recipes}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditCategory(category);
                          setShowModal(true);
                        }}
                        className="rounded-lg bg-blue-100 p-3 text-blue-600 hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteHandler(category.id)}
                        className="rounded-lg bg-red-100 p-3 text-red-600 hover:bg-red-200 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CategoryModal
          show={showModal}
          onClose={() => {
            (setShowModal(false), setEditCategory(null));
          }}
          editCategory={editCategory}
          fetchCategories={fetchCategories}
        />
      )}
    </>
  );
}

export default CategoryList;
