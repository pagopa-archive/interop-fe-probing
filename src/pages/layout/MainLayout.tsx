import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { logout, refreshToken } from '../../authetication/auth'

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      //Refresh the access and id token every 59 minutes
      const idTokenInterval = setInterval(() => {
        console.log('idTokenInterval')
        refreshToken()
      }, 3540000)

      //Log the user out once the refresh token has expired (30 days)
      const refreshTokenInterval = setInterval(() => {
        if (sessionStorage.getItem('token')) {
          logout()
            .then(() => {
              navigate('/login')
            })
            .catch((error: any) => {
              throw error
            })
        }
      }, 2147483647) // around 24.8 days which is the max delay
      // }, 2 592 000 000) //30 days - too large delay
      return () => {
        clearInterval(idTokenInterval)
        clearInterval(refreshTokenInterval)
      }
    }
  }, [sessionStorage.getItem('token')])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
