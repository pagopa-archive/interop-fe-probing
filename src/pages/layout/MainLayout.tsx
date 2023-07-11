import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logout } from '../../authetication/auth'
import { Spinner } from '../../components/spinner/Spinner'
import { useTranslation } from 'react-i18next'

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  const navigate = useNavigate()

  const [spinner, setSpinner] = useState(false)

  const { t } = useTranslation(['general'])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const idTokenInterval = setInterval(() => {
        const decodedJwt = parseJwt(sessionStorage.getItem('token') as string)
        if (decodedJwt.exp * 1000 < Date.now()) {
          setSpinner(true)
          const spinnerInterval = setInterval(() => {
            setSpinner(false)
            logout()
              .then(() => {
                clearInterval(spinnerInterval)
                clearInterval(idTokenInterval)
                navigate('/login')
              })
              .catch((error: any) => {
                throw error
              })
          }, 5000)
        }
      }, 1000)
    }
  }, [sessionStorage.getItem('token')])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Spinner
        open={spinner}
        setSpinner={setSpinner}
        message={t('expiredSession', { ns: 'general' })}
      />
    </>
  )
}

export default MainLayout
