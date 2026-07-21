import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "./CategoryModal";
import { categoryActions, fetchCategories } from "../../store/CategorySlice";

function CategoryList() {
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories/${id}.json`,
        {
          method: "DELETE",
        },
      );

      dispatch(categoryActions.deleteCategory(id));
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
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-emerald-700 active:scale-[0.98] transition"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

   

        {/* Content */}
        <div className="rounded-xl bg-white shadow">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[80px_1fr_140px] items-center gap-4 border-b bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500">
            <span>Image</span>
            <span>Category</span>
            <span className="text-center">Actions</span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : categories?.length ? (
            <div className="divide-y">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[80px_1fr_140px] items-center gap-4 px-6 py-4 hover:bg-slate-50 transition"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200"
                  />

                  <span className="font-semibold text-slate-700">
                    {category.name}
                  </span>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditCategory(category);
                        setShowModal(true);
                      }}
                      className="rounded-lg bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition cursor-pointer"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteHandler(category.id)}
                      className="rounded-lg bg-red-100 p-3 text-red-600 hover:bg-red-200 transition cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
              <FaSearch className="text-3xl" />
              <p className="text-sm">No categories found.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CategoryModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditCategory(null);
          }}
          editCategory={editCategory}
          fetchCategories={fetchCategories}
        />
      )}
    </>
  );
}

export default CategoryList;
