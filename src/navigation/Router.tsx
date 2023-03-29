import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "*", element: <ErrorPage /> }],
  },
  {
    path: "/",
    element: <Navigate replace to="/monitoring" />,
  },
]);
export { router };
