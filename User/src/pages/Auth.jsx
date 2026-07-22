import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
        {/* Logo */}
       <div className="flex flex-col items-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-md">
    <FaUtensils />
  </div>

  <h1 className="mt-5 text-3xl font-bold text-slate-800">
    BlueBite
  </h1>

  <p className="mt-2 text-center text-sm text-slate-500">
    Fresh food delivered to your doorstep.
  </p>
</div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
           className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;