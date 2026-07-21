import {
  FaHome,
  FaList,
  FaUtensils,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const logOutHandler = () =>{
    dispatch(authActions.logout());

    console.log("done")
  }
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-emerald-400">
          Food Admin
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
      

        <NavLink
          to="/categories"
          activeClassName="bg-emerald-600"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition"
        >
          <FaList />
          Categories
        </NavLink>

        <NavLink
          to="/recipes"
          activeClassName="bg-emerald-600"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition"
        >
          <FaUtensils />
          Recipes
        </NavLink>

        <NavLink
          to="/orders"
          activeClassName="bg-emerald-600"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition"
        >
          <FaClipboardList />
          Orders
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button onClick={logOutHandler} className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 hover:bg-red-600 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;