import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const list = [
    { value: "Home", path: "/" },
    { value: "About", path: "/about" },
    { value: "Sign In", path: "/sign-in" },
  ];

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth APP</h1>
        </Link>
        <ul className="flex gap-4">
          {list.map(({ value, path }) => {
            if (path === "/sign-in" && currentUser) {
              return (
                <Link to={"/profile"} key={path}>
                  <img
                    src={currentUser.profilePhoto}
                    alt="profilePhoto"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </Link>
              );
            }

            return (
              <Link to={path} key={path}>
                <li>{value}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
