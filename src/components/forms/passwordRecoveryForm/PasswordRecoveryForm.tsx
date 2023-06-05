import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, DialogContent, DialogContentText, Dialog, Stack } from '@mui/material'
import { passwordRecovery } from '../../../authetication/auth'
import { Form } from '../../form/Form'
import stores from '../../../store/Store'
import { Spinner } from '../../spinner/Spinner'

interface IProps {
  setRecoverySuccess: Function
}

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  email: '',
}

/**
 * Generating the login form
 * @component
 */
export const PasswordRecoveryForm: React.FC<IProps> = ({ setRecoverySuccess }) => {
  const [spinner, setSpinner] = useState(false)

  const { t } = useTranslation(['passwordRecoveryPage'])

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  /**
   * properties of the form fields
   */
  const fieldsProperties = {
    email: {
      name: 'email',
      label: 'Email',
      type: 'email',
      rules: {
        required: true,
      },
      width: '500px',
    },
  }

  const onSubmit = async (data: { [key: string]: string }) => {
    setSpinner(true)
    passwordRecovery(data.email)
      .then(() => {
        setSpinner(false)
        setRecoverySuccess(true)
      })
      .catch((error) => {
        setSpinner(false)
        const message = t('recoveryError', { ns: 'passwordRecoveryPage' })
        updateSnackbar(true, message, 'error')
      })
  }

  return (
    <>
      <Form
        fields={[fieldsProperties.email]}
        submitButton={t('submit', { ns: 'passwordRecoveryPage' })}
        submitFunction={onSubmit}
        defaultValues={defaultFormValues}
      />
      <Spinner
        open={spinner}
        setSpinner={setSpinner}
        message={t('spinnerMessage', { ns: 'passwordRecoveryPage' })}
      />
    </>
  )
}
