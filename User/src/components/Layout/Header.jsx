import { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUserCircle, FaUtensils } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import CartModal from "../../services/CartModal";
import Cart from "../../pages/Cart";
import ProfileDropdown from "../Profile/ProfileDropdown";
import SearchResults from "./SearchResults";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const categoryItems = useSelector((state) => state.category.categories);

  const filteredCategories = categoryItems.filter((item) =>
    item.name.toLowerCase().trim().includes(search.toLowerCase().trim()),
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
              <FaUtensils />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">BlueBite</h1>
              <p className="text-xs text-slate-500">Fresh Food Delivered</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden w-2/5 items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 md:flex">
            <FiSearch className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search recipes..."
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowCart(true)}
              className="relative  text-slate-700 hover:text-blue-600"
            >
              <FaShoppingCart size={25} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex h-13 w-13 items-center justify-center rounded-full text-slate-700 hover:text-blue-600"
              >
                <FaUserCircle size={25} />
              </button>

              {showDropdown && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </header>

      {showCart && (
        <CartModal onClose={() => setShowCart(false)}>
          <Cart />
        </CartModal>
      )}

      {search.trim() && (
        <SearchResults data={filteredCategories} setSearch={setSearch} />
      )}
    </>
  );
}

export default Header;
