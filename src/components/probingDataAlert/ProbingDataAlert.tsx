import { Alert, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ProbingData {
  probingEnabled: boolean
  state: string
  eserviceActive: boolean
}

export const ProbingDataAlert: React.FC<ProbingData> = ({
  probingEnabled,
  state,
  eserviceActive,
}) => {
  const { t } = useTranslation(['detailsPage'])

  let message = ''

  if (probingEnabled === false && state === 'N/D') {
    message = 'monitoringSystemSuspendedMessage'
  } else if (state === 'OFFLINE' && !eserviceActive) {
    message = 'versionSuspendedMessage'
  } else if (state === 'OFFLINE' && eserviceActive) {
    message = 'eserviceNotAnswerMessage'
  }

  if (!message) return null

  return (
    <Grid item container>
      <Alert
        sx={{
          width: '100%',
        }}
        severity="warning"
      >
        {t(message)}
      </Alert>
    </Grid>
  )
}
