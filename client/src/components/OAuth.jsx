import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();

  const handleConnectionWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const {
        user: { displayName, email, photoURL: profilePhoto },
      } = await signInWithPopup(auth, provider);

      const res = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          profilePhoto,
        }),
      });

      const data = await res.json();

      console.log(data);

      dispatch(signInSuccess(data));
    } catch (error) {
      console.log(`Couldn't connect with Google`, error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleConnectionWithGoogle}
      className="bg-red-700 rounded-lg text-white p-3 uppercase hover:opacity-95"
    >
      Connect with Google
    </button>
  );
}
