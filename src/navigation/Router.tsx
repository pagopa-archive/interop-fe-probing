import { createBrowserRouter, Navigate } from "react-router-dom";
import DettaglioServicePage from "../pages/dettaglioService/DettaglioServicePage";
import MainLayout from "../pages/layout/MainLayout";
/**
 * Create the routing of the page
 */
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "*", element: <Navigate replace to="/dettaglio" /> }],
  },
  {
    path: "/dettaglio",
    element: <MainLayout />,
    children: [
      { index: true, path: "/dettaglio", element: <DettaglioServicePage /> },
    ],
  },
]);
export { router };
