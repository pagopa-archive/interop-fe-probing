import { Alert, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

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
  const [message, setMessage] = useState('')

  const { t } = useTranslation(['detailsPage'])

  useEffect(() => {
    if (probingEnabled === false && state === 'n/d') {
      setMessage('monitoringSystemSuspendedMessage')
    } else if (state === 'offline' && !eserviceActive) {
      setMessage('versionSuspendedMessage')
    } else if (state === 'offline' && eserviceActive) {
      setMessage('eserviceNotAnswerMessage')
    } else {
      setMessage('')
    }
  }, [probingEnabled, state, eserviceActive])

  return (
    <>
      {message !== '' ? (
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
      ) : null}
    </>
  )
}
