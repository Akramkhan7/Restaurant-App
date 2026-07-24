import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "./CategoryModal";
import {
  categoryActions,
  fetchCategories,
} from "../../store/CategorySlice";

function CategoryList() {
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    try {
      await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories/${id}.json`,
        {
          method: "DELETE",
        }
      );

      dispatch(categoryActions.deleteCategory(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Categories
            </h1>
            <p className="text-sm text-slate-500">
              Manage your food categories
            </p>
          </div>

          <button
            onClick={() => {
              setEditCategory(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
            <FaSearch className="mx-auto text-4xl text-slate-400" />

            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No Categories Found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start by adding your first category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-44 w-full object-cover"
                />

                <div className="flex flex-col p-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {category.name}
                  </h2>

              

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => {
                        setEditCategory(category);
                        setShowModal(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-blue-600 py-2 text-sm font-medium text-blue-600"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteHandler(category.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-red-500 py-2 text-sm font-medium text-red-500"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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