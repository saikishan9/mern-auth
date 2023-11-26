import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Profile, SignIn, SignUp } from "./pages/index";

export default function App() {
  const paths = [
    {
      path: "/",
      element: <Home />,
    },
    { path: "/about", element: <About /> },
    { path: "/profile", element: <Profile /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
  ];

  return (
    <Router>
      <Routes>
        {paths.map(({ path, element }) => (
          <Route key={path} path={path} element={element}></Route>
        ))}
      </Routes>
    </Router>
  );
}
