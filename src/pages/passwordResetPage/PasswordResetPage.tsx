import { PasswordResetForm } from '../../components/forms/passwordResetForm/PasswordResetForm'
import { Typography, Stack, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IllusCompleted } from '@pagopa/mui-italia'

interface SuccessScreenProps {
  title: string
  subtitle: string
  submitButton: string
  onSubmitButton: () => void
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  subtitle,
  submitButton,
  onSubmitButton,
}) => {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      component="main"
      my={9}
      mx={'auto'}
      sx={{ maxWidth: '600px' }}
    >
      <IllusCompleted />
      <Typography variant="h3" component="h1" align={'center'}>
        {title}
      </Typography>
      <Typography variant="body1" align={'center'}>
        {subtitle}
      </Typography>
      <Button size="large" variant="contained" onClick={() => onSubmitButton()}>
        <Typography sx={{ color: 'white' }}> {submitButton}</Typography>
      </Button>
    </Stack>
  )
}

export const PasswordResetPage: React.FC = () => {
  const [resetSuccess, setResetSuccess] = useState(false)

  const { t } = useTranslation(['passwordResetPage'])

  const navigate = useNavigate()

  if (resetSuccess)
    return (
      <SuccessScreen
        title={t('successScreenTitle', { ns: 'passwordResetPage' })}
        subtitle={t('successScreenSubtitle', { ns: 'passwordResetPage' })}
        submitButton={t('successScreenSubmitButton', { ns: 'passwordResetPage' })}
        onSubmitButton={() => navigate('/login')}
      />
    )

  return (
    <Stack spacing={4} alignItems="center" component="main" my={9}>
      <Typography variant="h3" component="h1">
        {t('title', { ns: 'passwordResetPage' })}
      </Typography>
      <Typography variant="body1" align={'center'}>
        {t('subtitle', { ns: 'passwordResetPage' })}
      </Typography>
      <PasswordResetForm setResetSuccess={setResetSuccess} />
    </Stack>
  )
}
