import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footer";
import Header from "./components/Header";
import ModalProvider from "./providers/modal-provider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  const BasicLayout = () => {
    return (
      <div className="app">
        <Header />
        <ModalProvider />
        <Outlet />
        <Toaster />
        {/* <Footer /> */}
      </div>
    );
  };
  const Layout = () => {
    return (
      <div className="app">
        {/* <Header /> */}
        <ModalProvider />
        <Outlet />
        <Toaster />
        {/* <Footer /> */}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/store/:storeId",
          element: <Dashboard />,
        },
        {
          path: "/store/:storeId/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
