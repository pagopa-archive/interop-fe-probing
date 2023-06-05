import { LoginForm } from '../../components/forms/loginForm/LoginForm'
import { Typography, Link, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { t } = useTranslation(['loginPage'])

  const navigate = useNavigate()

  return (
    <Stack spacing={4} alignItems="center" component="main" my={9}>
      <Typography variant="h3" component="h1">
        {t('login', { ns: 'loginPage' })}
      </Typography>
      <LoginForm />
      <Typography color="text.secondary">
        {t('forgotPassword1', { ns: 'loginPage' })}
        <Link onClick={() => navigate('/recupero-password')} underline="none" component="button">
          {t('forgotPassword2', { ns: 'loginPage' })}
        </Link>
        {t('forgotPassword3', { ns: 'loginPage' })}
      </Typography>
    </Stack>
  )
}
export default LoginPage
