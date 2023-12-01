import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/index";
import { Home, About, Profile, SignIn, SignUp } from "./pages/index";
import PrivateRoute from "./components/PrivateRoute";

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
      <Header />
      <Routes>
        {paths.map(({ path, element }) => {
          if (path === "/profile") {
            return (
              <Route key={path} element={<PrivateRoute />}>
                <Route path={path} element={element} />
              </Route>
            );
          }

          return <Route key={path} path={path} element={element} />;
        })}
      </Routes>
    </Router>
  );
}
