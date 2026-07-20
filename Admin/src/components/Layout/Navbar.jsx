import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="h-17 bg-white shadow-sm flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="flex items-center gap-3">
        <FaUserCircle className="text-4xl text-slate-600" />

        <div>
          <h4 className="font-semibold text-slate-800">
            Admin
          </h4>

          <p className="text-sm text-slate-500">
            Restaurant Manager
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;