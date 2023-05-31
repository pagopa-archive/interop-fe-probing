import { LoginForm } from '../../components/forms/loginForm/LoginForm'
import { Typography, Link, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation(['loginPage'])

  return (
    <Stack spacing={4} alignItems="center" component="main" my={9}>
      <Typography variant="h3" component="h1">
        {t('login', { ns: 'loginPage' })}
      </Typography>
      <LoginForm />
      <Typography color="text.secondary">
        {t('forgotPassword1', { ns: 'loginPage' })}
        <Link href="" underline="none">
          {t('forgotPassword2', { ns: 'loginPage' })}
        </Link>
        {t('forgotPassword3', { ns: 'loginPage' })}
      </Typography>
    </Stack>
  )
}
export default LoginPage
