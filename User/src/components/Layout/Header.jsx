import { FaShoppingCart, FaUserCircle, FaUtensils } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
            <FaUtensils />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              BlueBite
            </h1>
            <p className="text-xs text-slate-500">
              Fresh Food Delivered
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden w-2/5 items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 md:flex">
          <FiSearch className="text-slate-500" />

          <input
            type="text"
            placeholder="Search recipes..."
            className="ml-3 w-full bg-transparent outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button className="relative text-2xl text-slate-700 hover:text-blue-600">
            <FaShoppingCart />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </button>

          <button className="text-3xl text-slate-700 hover:text-blue-600">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;