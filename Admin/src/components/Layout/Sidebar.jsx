import {
  FaList,
  FaUtensils,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r  border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-3xl font-bold text-blue-600">
          BlueBite
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <NavLink
          exact
          to="/dashboard"
          activeClassName="bg-blue-600 text-white"
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-700 "
        >
           <FaTachometerAlt />  Dashboard
        </NavLink>

        <NavLink
          to="/categories"
          activeClassName="bg-blue-600 text-white"
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-700"
        >
          <FaList />
          Categories
        </NavLink>

        <NavLink
          to="/recipes"
          activeClassName="bg-blue-600 text-white"
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-700 "
        >
          <FaUtensils />
          Recipes
        </NavLink>

        <NavLink
          to="/orders"
          activeClassName="bg-blue-600 text-white"
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-700  "
        >
          <FaClipboardList />
          Orders
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={logOutHandler}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;