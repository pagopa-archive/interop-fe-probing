import { Chip, Grid, Typography, Button, Alert } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import format from 'date-fns/format'

interface MainData {
  eserviceName: string
  producerName: string
  versionNumber: string
}

interface ProbingData {
  probingEnabled: boolean
  state: string
  responseReceived: string
  eserviceActive: boolean
}

interface IProps {
  mainData: MainData
  probingData: ProbingData
  reloadProbingDetails: () => void
  viewInCatalogue?: () => void
}

enum ChipColor {
  online = 'success',
  offline = 'error',
  'n/d' = 'warning',
  true = 'success',
  false = 'error',
}

enum ChipLabel {
  true = 'active',
  false = 'suspended',
}

const blocksInfo: Array<{ title: string; blocks: Array<string> }> = [
  {
    title: 'Informazioni generali',
    blocks: ['producerName', 'versionNumber', 'eserviceName'],
  },
  {
    title: 'In tempo reale',
    blocks: ['probingEnabled', 'state', 'responseReceived'],
  },
]

export const InformationBlock: React.FC<IProps> = ({
  mainData,
  probingData,
  reloadProbingDetails,
  viewInCatalogue,
}) => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
  })

  const { t } = useTranslation(['detailsPage', 'general'])

  useEffect(() => {
    if (probingData.probingEnabled === false && probingData.state === 'n/d') {
      setAlert({
        show: true,
        message: 'monitoringSystemSuspendedMessage',
      })
    } else if (probingData.state === 'offline' && !probingData.eserviceActive) {
      setAlert({
        show: true,
        message: 'versionSuspendedMessage',
      })
    } else if (probingData.state === 'offline' && probingData.eserviceActive) {
      setAlert({
        show: true,
        message: 'eserviceNotAnswerMessage',
      })
    } else {
      setAlert({
        show: false,
        message: '',
      })
    }
  }, [probingData])

  return (
    <>
      <Grid container direction={'column'} alignItems="center" mb={5}>
        <Grid item container direction="column" mb={5}>
          {blocksInfo[0].blocks.map((block) => {
            return block === 'eserviceName' ? (
              <Grid item key={uuid()}>
                <InformationContainer
                  key={block}
                  label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                  content={
                    <Grid container>
                      <Button
                        color={'primary'}
                        disableRipple // remove onClick effect
                        sx={{
                          fontWeight: 'bold',
                          border: 'none!important',
                          textTransform: 'none',
                          alignItems: 'start !important',
                          p: '0',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                          '& .MuiButton-startIcon': {
                            paddingBottom: '1%',
                          },
                        }}
                        variant="outlined"
                        startIcon={<LockIcon />}
                        endIcon={<LaunchIcon />}
                        onClick={viewInCatalogue}
                      >
                        {t('viewInCatalog', { ns: 'detailsPage' })}
                      </Button>
                    </Grid>
                  }
                />
              </Grid>
            ) : (
              <Grid item key={block}>
                <InformationContainer
                  label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                  content={mainData[block as keyof MainData]}
                />
              </Grid>
            )
          })}
        </Grid>
        <Grid item container direction="column">
          <Grid item textAlign={'center'}>
            <Typography
              sx={{
                fontSize: '1.4em',
                fontWeight: 'bold',
                color: '#17324D',
              }}
            >
              {t('realTimeTitle', { ns: 'detailsPage' })}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            px={2}
            my={2}
            justifyContent={'end'}
            sx={{ backgroundColor: '#F2F2F2' }}
          >
            <Button
              onClick={() => reloadProbingDetails()}
              color={'primary'}
              disableRipple
              sx={{
                fontWeight: 'bold',
                border: 'none!important',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              variant="outlined"
              startIcon={<RefreshIcon />}
            >
              {t('reload', { ns: 'detailsPage' })}
            </Button>
          </Grid>
          <Grid item container direction="column">
            {blocksInfo[1].blocks.map((block) => (
              <Grid item key={uuid()}>
                <InformationContainer
                  key={block}
                  label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                  content={
                    ['probingEnabled', 'state'].includes(block) ? (
                      <Chip
                        size={'small'}
                        label={
                          block === 'state'
                            ? probingData[block as keyof ProbingData]
                            : t(ChipLabel[probingData[block].toString() as keyof ChipLabel], {
                                ns: 'detailsPage',
                              })
                        }
                        color={ChipColor[probingData[block].toString() as keyof ChipLabel]}
                      />
                    ) : (
                      format(
                        new Date(probingData['responseReceived']),
                        t('dateFormat', {
                          ns: 'general',
                        })
                      )
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {alert.show && (
          <Grid item container>
            <Alert
              sx={{
                width: '100%',
              }}
              severity="warning"
            >
              {t(alert.message)}
            </Alert>
          </Grid>
        )}
      </Grid>
    </>
  )
}