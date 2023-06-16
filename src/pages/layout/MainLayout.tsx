import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { logout, refreshToken } from '../../authetication/auth'
import { useNavigate } from 'react-router-dom'

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    //Refresh the access and id token every 59 minutes
    const idTokenInterval = setInterval(async () => {
      await refreshToken()
    }, 3540000)

    //Log the user out once the refresh token has expired (30 days)
    const refreshTokenInterval = setInterval(async () => {
      await logout()
        .then(() => {
          navigate('/login')
        })
        .catch((error: any) => {
          throw error
        })
    }, 2592000000)

    return () => {
      clearInterval(idTokenInterval)
      clearInterval(refreshTokenInterval)
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
