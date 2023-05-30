import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, DialogContent, DialogContentText, Dialog, Stack } from '@mui/material'
import { login } from '../../../authetication/auth'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../form/Form'
import stores from '../../../store/Store'

interface SpinnerProps {
  open: boolean
  setSpinner: Function
  message: string
}

const Spinner: React.FC<SpinnerProps> = ({ open, setSpinner, message }) => {
  return (
    <Dialog open={open} onClose={() => setSpinner(false)}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
      <DialogContent>
        <DialogContentText color="primary" sx={{ fontWeight: 'bold', fontSize: 14 }}>
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  username: '',
  password: '',
}

/**
 * Generating the login form
 * @component
 */
export const LoginForm = () => {
  const [spinner, setSpinner] = useState(false)

  const { t } = useTranslation(['loginPage'])

  const navigate = useNavigate()

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  const [updateLogStatus] = stores.useLogStatusStore((state) => [state.updateLogStatus])

  /**
   * properties of the form fields
   */
  const fieldsProperties = {
    username: {
      name: 'username',
      label: t('username', { ns: 'loginPage' }),
      type: 'email',
      rules: {
        required: t('incorrectUsername', { ns: 'loginPage' }),
      },
    },
    password: {
      name: 'password',
      label: t('password', { ns: 'loginPage' }),
      type: 'password',
      rules: {
        required: t('incorrectPassword', { ns: 'loginPage' }),
      },
    },
  }

  const onSubmit = async (data: { [key: string]: string }) => {
    setSpinner(true)
    login(data.username, data.password)
      .then((data) => {
        updateLogStatus(data.signInUserSession.idToken.jwtToken)
        setSpinner(false)
        navigate('/monitoraggio')
        updateSnackbar(true, t('loginSuccessMessage', { ns: 'loginPage' }), 'success')
      })
      .catch((error) => {
        setSpinner(false)
        const message = t('loginError', { ns: 'loginPage' })
        updateSnackbar(true, message, 'error')
      })
  }

  return (
    <>
      <Form
        fields={[fieldsProperties.username, fieldsProperties.password]}
        submitButton={t('login', { ns: 'loginPage' })}
        submitFunction={onSubmit}
        defaultValues={defaultFormValues}
      />
      <Spinner
        open={spinner}
        setSpinner={setSpinner}
        message={t('loginSpinnerMessage', { ns: 'loginPage' })}
      />
    </>
  )
}
