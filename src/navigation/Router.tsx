import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";
import MonitaraggioPage from "../pages/monitoraggio/MonitaraggioPage";
/**
 * Create the routing of the page
 */
const router = createBrowserRouter([
  {
    path: "/monitaraggio",
    element: <MainLayout />,
    children: [
      { index: true, path: "/monitaraggio", element: <MonitaraggioPage /> },
    ],
  },
  {
    path: "/",
    element: <Navigate replace to="/monitaraggio" />,
  },
]);
export { router };
