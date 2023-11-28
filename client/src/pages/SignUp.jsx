import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const inputProps = {
    className: "bg-slate-100 p-3 rounded-lg",
    onChange: handleChange,
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          {...inputProps}
        />
        <input type="email" placeholder="Email" id="email" {...inputProps} />
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...inputProps}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? `Loading...` : `Sign Up`}
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-600">
          Sign-in
        </Link>
      </div>
      <p className="text-red-700 mt-2">
        {error && (error || "Something went wrong!")}
      </p>
    </div>
  );
}
