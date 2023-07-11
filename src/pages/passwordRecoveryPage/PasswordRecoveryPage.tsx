import { PasswordRecoveryForm } from '../../components/forms/passwordRecoveryForm/PasswordRecoveryForm'
import { Typography, Stack, Button, Badge } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MailOutlined from '@mui/icons-material/MailOutlined'
import { IllusEmailValidation } from '@pagopa/mui-italia'

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
      sx={{ maxWidth: '500px' }}
    >
      <IllusEmailValidation />
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      <Typography variant="body1" align={'center'}>
        {subtitle}
      </Typography>
      <Button
        sx={{
          backgroundColor: 'primary.main',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
        size="large"
        variant="contained"
        onClick={() => onSubmitButton()}
      >
        <Typography sx={{ color: 'white' }}> {submitButton}</Typography>
      </Button>
    </Stack>
  )
}

export const PasswordRecoveryPage: React.FC = () => {
  const [recoverySuccess, setRecoverySuccess] = useState(false)

  const { t } = useTranslation(['passwordRecoveryPage'])

  const navigate = useNavigate()

  if (recoverySuccess)
    return (
      <SuccessScreen
        title={t('successScreenTitle', { ns: 'passwordRecoveryPage' })}
        subtitle={t('successScreenSubtitle', { ns: 'passwordRecoveryPage' })}
        submitButton={t('successScreenSubmitButton', { ns: 'passwordRecoveryPage' })}
        onSubmitButton={() => navigate('/monitoraggio')}
      />
    )

  return (
    <Stack spacing={4} alignItems="center" component="main" my={9}>
      <Typography variant="h3" component="h1">
        {t('title', { ns: 'passwordRecoveryPage' })}
      </Typography>
      <PasswordRecoveryForm setRecoverySuccess={setRecoverySuccess} />
    </Stack>
  )
}
