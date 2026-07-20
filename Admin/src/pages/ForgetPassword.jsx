import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      toast.success("Password reset link sent to your email.");

      setEmail("");
    } catch (err) {
      toast.error(err.message.replaceAll("_", " "));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
            <FaEnvelope />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Forgot Password
          </h1>

          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your registered email address and we'll send you a password
            reset link.
          </p>
        </div>

        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Send Reset Link
          </button>
        </form>

        <Link
          to="/auth"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          <FaArrowLeft />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;