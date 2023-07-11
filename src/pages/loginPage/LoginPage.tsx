import { LoginForm } from '../../components/forms/loginForm/LoginForm'
import { Typography, Link, Stack, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ButtonNaked } from '@pagopa/mui-italia'

const LoginPage = () => {
  const { t } = useTranslation(['loginPage', 'general'])

  const navigate = useNavigate()

  return (
    <Stack spacing={4} alignItems="center" component="main" my={9}>
      <Typography variant="h3" component="h1">
        {t('login', { ns: 'loginPage' })}
      </Typography>
      <LoginForm />
      <Typography color="text.secondary">
        {t('forgotPassword1', { ns: 'loginPage' })}
        <Link underline="none" component={RouterLink} to="/recupero-password">
          {t('forgotPassword2', { ns: 'loginPage' })}
        </Link>
        {t('forgotPassword3', { ns: 'loginPage' })}
      </Typography>
      <ButtonNaked
        onClick={() => navigate('/monitoraggio')}
        color="primary"
        size="small"
        startIcon={<ArrowBackIcon />}
      >
        {t('goBack', { ns: 'general' })}
      </ButtonNaked>
    </Stack>
  )
}
export default LoginPage
