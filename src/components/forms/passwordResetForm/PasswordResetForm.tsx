import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { passwordReset } from '../../../authetication/auth'
import { Form } from '../../form/Form'
import stores from '../../../store/Store'
import { Spinner } from '../../spinner/Spinner'
import queryString from 'query-string'

interface IProps {
  setResetSuccess: Function
}

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  password: '',
  confirmPassword: '',
}

const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )[\w!@#$%^&()+."\-\?{}`~[\]*=|;:'<>,\/\\]{12,}$/

/**
 * Generating the password reset form
 * @component
 */
export const PasswordResetForm: React.FC<IProps> = ({ setResetSuccess }) => {
  const [spinner, setSpinner] = useState(false)

  const { t } = useTranslation(['passwordResetPage'])

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  /**
   * properties of the form fields
   */
  const fieldsProperties = [
    {
      name: 'password',
      label: t('newPassword', { ns: 'passwordResetPage' }),
      type: 'password',
      rules: {
        minLength: {
          value: 12,
          message: 'passwordTooShortError',
        },
        pattern: {
          value: PASSWORD_REGEX,
          message: 'passwordRegexError',
        },
      },
      width: '500px',
    },
    {
      name: 'confirmPassword',
      label: t('confirmNewPassword', { ns: 'passwordResetPage' }),
      type: 'password',
      rules: {
        minLength: {
          value: 12,
          message: 'passwordTooShortError',
        },
        pattern: {
          value: PASSWORD_REGEX,
          message: 'passwordRegexError',
        },
        validate: {
          validateEquality: (_: string, values: { [key: string]: string }) =>
            values.password === _ || 'passwordEqualityError',
        },
      },
      width: '500px',
    },
  ]

  const onSubmit = async (data: { [key: string]: string }) => {
    const code = queryString.parse(location.hash).code?.toString() || ''
    const email = queryString.parse(location.hash).username?.toString().replace('%', '@') || ''
    setSpinner(true)
    passwordReset(email, code, data.password)
      .then(() => {
        setSpinner(false)
        setResetSuccess(true)
      })
      .catch((error) => {
        setSpinner(false)
        const message = t('resetError', { ns: 'passwordResetPage' })
        updateSnackbar(true, message, 'error')
      })
  }

  return (
    <>
      <Form
        fields={fieldsProperties}
        submitButton={t('submit', { ns: 'passwordResetPage' })}
        submitFunction={onSubmit}
        defaultValues={defaultFormValues}
        buttonDisable={'never'}
        validationMode={'onSubmit'}
        t={t}
      />
      <Spinner
        open={spinner}
        setSpinner={setSpinner}
        message={t('spinnerMessage', { ns: 'passwordResetPage' })}
      />
    </>
  )
}
