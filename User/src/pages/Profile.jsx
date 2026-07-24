import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Profile() {
  const db_url = import.meta.env.VITE_DATABASE_URL;
  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  const nameRef = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${db_url}/profiles/${userId}.json`);
        const data = await res.json();

        const name = data?.fullName || localStorage.getItem("username") || "";
        if (nameRef.current) {
          nameRef.current.value = name;
        }
      } catch (err) {
        console.log(err);
        const cached = localStorage.getItem("username");
        if (nameRef.current) {
          nameRef.current.value = cached || "";
        }
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, db_url]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const profile = {
        fullName: nameRef.current.value,
        email,
      };

      const res = await fetch(`${db_url}/profiles/${userId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      // Update Firebase Authentication displayName
      const authRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: nameRef.current.value,
            returnSecureToken: true,
          }),
        },
      );

      const authData = await authRes.json();

      if (!authRes.ok) {
        throw new Error(authData.error.message);
      }

      dispatch(authActions.setName(nameRef.current.value));

      localStorage.setItem("username", nameRef.current.value);

      setMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
            />
          </div>

          {message && (
            <p className="text-center text-sm font-medium text-green-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
