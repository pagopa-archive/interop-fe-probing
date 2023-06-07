import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, DialogContent, DialogContentText, Dialog, Stack } from '@mui/material'
import { login } from '../../../authetication/auth'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../form/Form'
import stores from '../../../store/Store'
import { Spinner } from '../../spinner/Spinner'

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
        buttonDisable={'onValid'}
        validationMode={'onSubmit'}
      />
      <Spinner
        open={spinner}
        setSpinner={setSpinner}
        message={t('loginSpinnerMessage', { ns: 'loginPage' })}
      />
    </>
  )
}
