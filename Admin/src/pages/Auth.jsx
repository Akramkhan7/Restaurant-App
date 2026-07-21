import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../store/authSlice";
import { useHistory } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      dispatch(
        authActions.login({
          token: data.idToken,
          userId: data.localId,
        }),
      );
      toast.success("Login Successful!");

      setEmail("");
      setPassword("");
      history.replace("/categories");
    } catch (err) {
      toast.error(err.message.replaceAll("_", " "));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
            <FaUtensils />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Restaurant Admin
          </h1>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center">
          <p className="text-sm font-medium text-emerald-700">
            Restaurant Admin Panel
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
