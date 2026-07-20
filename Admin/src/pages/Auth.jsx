import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../store/authSlice";
import { useHistory } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
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

    if (!isLogin && !name) {
      toast.error("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
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
            idToken: data.idToken,
            userId: data.localId,
          }),
        );

        toast.success("Login Successful!");

        setEmail("");
        setPassword("");
        history.push("/dashboard");
      } else {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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

        // Save Display Name
        await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: data.idToken,
              displayName: name,
              returnSecureToken: true,
            }),
          },
        );

        toast.success("Account Created Successfully!");

        setName("");
        setEmail("");
        setPassword("");

        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.message.replaceAll("_", " "));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl">
            <FaUtensils />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Food Delivery
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? "Login to your account" : "Create your account"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                type="button"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                type="button"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
