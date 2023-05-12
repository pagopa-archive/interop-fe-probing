import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../pages/layout/MainLayout'
import MonitoringPage from '../pages/monitoring/MonitoringPage'
import { DetailsServicePage } from '../pages/detailsServicePage/DetailsServicePage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/monitoring', element: <MonitoringPage /> },
      { path: '/monitoring/eservices/:id', element: <DetailsServicePage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
  {
    path: '/',
    element: <Navigate replace to="/monitoring" />,
  },
])
export { router }
