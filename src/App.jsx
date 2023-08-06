import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footer";
import Header from "./components/Header";
import ModalProvider from "./providers/modal-provider";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <ModalProvider />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
