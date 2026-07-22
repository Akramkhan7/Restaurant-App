import { FiSearch } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchResults({ data }) {
  const history = useHistory();
  return (
    <div className="absolute left-131 z-50 mt-18 w-125 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
    
      {data.length > 0 ? (
        <>
          <div className="border-b bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </div>

          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                history.push(`/category/${item.id}`);
                setSearch("");
              }}
              className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-all duration-200 hover:bg-blue-50 last:border-b-0"
            >
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <MdRestaurantMenu size={16} />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-slate-800">{item.name}</h3>
                <p className="text-xs text-gray-500">
                  Browse {item.name} recipes
                </p>
              </div>

              <FiSearch className="text-gray-400" />
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center py-8">
          <FiSearch size={28} className="mb-2 text-gray-300" />

          <p className="font-medium text-gray-600">No categories found</p>

          <p className="text-sm text-gray-400">Try a different keyword</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
