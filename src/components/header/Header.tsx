import { HeaderAccount, HeaderProduct, ProductSwitchItem, RootLinkType } from '@pagopa/mui-italia'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../authetication/auth'
import { useTranslation } from 'react-i18next'
import stores from '../../store/Store'

const link: RootLinkType = {
  title: 'PagoPA S.p.A.',
  label: 'PagoPA S.p.A.',
  href: 'https://www.pagopa.it/it/',
  ariaLabel: '',
}

const productsList: ProductSwitchItem[] = [
  {
    id: 'pdnd',
    title: 'PDND Interoperabilità',
    productUrl: '',
    linkType: 'internal',
  },
]

const Header = () => {
  const { t } = useTranslation(['general', 'loginPage'])

  const navigate = useNavigate()

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  const [updateLogStatus] = stores.useLogStatusStore((state) => [state.updateLogStatus])

  const handleLogout = async () => {
    logout()
      .then((res) => {
        updateLogStatus(false)
        navigate('/login')
        updateSnackbar(true, t('logoutSuccessMessage', { ns: 'loginPage' }), 'success')
      })
      .catch((error) => {
        updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error')
      })
  }

  return (
    <header>
      <HeaderAccount
        enableAssistanceButton={false}
        loggedUser={stores.useLogStatusStore((state) => state.status)}
        rootLink={link}
        onAssistanceClick={() => {
          console.log('Clicked/Tapped on Assistance')
        }}
        onLogin={() => navigate('/login')}
        onLogout={() => handleLogout()}
      />
      <HeaderProduct productsList={productsList} />
    </header>
  )
}
export default Header
