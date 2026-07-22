import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-8">
        {/* Icon */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow-md">
            <FaLock />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Forgot Password?
          </h1>

          <p className="mt-2 text-center text-slate-500">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-sm text-slate-600">
            Remember your password?
          </p>

          <Link
            to="/user-auth"
            className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;