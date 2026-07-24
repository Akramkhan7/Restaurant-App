import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { FiUser, FiPackage, FiLogOut } from "react-icons/fi";

function ProfileDropdown({ setShowDropdown }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    setShowDropdown(false);
    dispatch(authActions.logout());
  };

  return (
    <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-50">
      <ul className="py-2">
        <li>
          <Link
            onClick={() => setShowDropdown(false)}
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <FiUser size={18} />
            <span>My Profile</span>
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <FiPackage size={18} />
            <span>My Orders</span>
          </Link>
        </li>

        <li>
          <button
            onClick={logoutHandler}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
