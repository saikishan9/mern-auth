import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";

import {
  updateUserFailure,
  updateUserInitiated,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = (image) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Math.round(progress));
        },
        (error) => {
          console.log(error);
          setImageUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setFormData({ ...formData, profilePhoto: downloadURL });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserInitiated());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (data?.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
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
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePhoto || currentUser.profilePhoto}
          alt="profilePhoto"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2"
          onClick={() => fileRef.current?.click()}
        />

        <p className="text-sm self-center">
          {imageUploadError ? (
            <span className="text-red-700">
              Error Uploading Image (file size must be less than 6MB)
            </span>
          ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imageUploadProgress}%...`}</span>
          ) : imageUploadProgress === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>

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
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
