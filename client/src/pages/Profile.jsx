import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError("");

      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (data?.success === false) {
        // setError(data);
        return;
      }

      // navigate("/sign-in");
    } catch (error) {
      console.log(error);
      // setError(error);
    } finally {
      // setLoading(false);
    }
  };

  const inputProps = (id) => ({
    className: "bg-slate-100 p-3 rounded-lg",
    onChange: handleChange,
    defaultValue: currentUser[id] ?? "",
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4"
      >
        <img
          src={currentUser.profilePhoto}
          alt="profilePhoto"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          {...inputProps("username")}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          {...inputProps("email")}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...inputProps()}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? `Loading...` : `Update`}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span to="/sign-in" className="text-red-700 cursor-pointer">
          Sign-out
        </span>
      </div>
      <p className="text-red-700 mt-2">
        {error && (error.message || "Something went wrong!")}
      </p>
    </div>
  );
}
