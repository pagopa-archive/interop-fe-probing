import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";
import MonitoringPage from "../pages/monitoring/MonitoringPage";
/**
 * Create the routing of the page
 */
const router = createBrowserRouter([
  {
    path: "/monitoring",
    element: <MainLayout />,
    children: [
      { index: true, path: "/monitoring", element: <MonitoringPage /> },
    ],
  },
  {
    path: "/",
    element: <Navigate replace to="/monitoring" />,
  },
]);
export { router };
