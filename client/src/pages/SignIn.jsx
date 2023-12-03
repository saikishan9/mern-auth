import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInInitiated,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { OAuth } from "../components";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInInitiated());

      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data?.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };

  const inputProps = {
    className: "bg-slate-100 p-3 rounded-lg",
    onChange: handleChange,
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4"
      >
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
          {loading ? `Loading...` : `Sign In`}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2">
        <p>Dont Have an account?</p>
        <Link to="/sign-up" className="text-blue-600">
          Sign-up
        </Link>
      </div>
      <p className="text-red-700 mt-2">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
