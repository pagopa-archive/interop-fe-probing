import { LoginForm } from '../../components/forms/loginForm/LoginForm'
import { Grid, Typography, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation(['loginPage'])

  return (
    <Grid
      container
      direction="column"
      sx={{ height: '100%' }}
      justifyContent="center"
      rowGap={3}
      mt={5}
      mb={6}
    >
      <Grid item alignItems="center" justifyContent="center" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('login', { ns: 'loginPage' })}
        </Typography>
      </Grid>
      <Grid item container alignSelf={'center'} width={'60%'} justifyContent={'center'}>
        <LoginForm />
      </Grid>
      <Grid item alignSelf={'center'}>
        <Typography>
          {t('forgotPassword1', { ns: 'loginPage' })}
          <Link href="" underline="none">
            {t('forgotPassword2', { ns: 'loginPage' })}
          </Link>
          {t('forgotPassword3', { ns: 'loginPage' })}
        </Typography>
      </Grid>
    </Grid>
  )
}
export default LoginPage
