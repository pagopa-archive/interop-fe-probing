import { Chip, Grid, Typography, Button, Alert } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface MainData {
  eserviceName: string
  producerName: string
  versionNumber: string
}

interface ProbingData {
  probingEnabled: boolean
  state: string
  responseReceived: string
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
  true = 'attivo',
  false = 'sospenso',
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

  const { t } = useTranslation(['detailsPage'])

  useEffect(() => {
    if (probingData.probingEnabled === false && probingData.state === 'n/d') {
      setAlert({
        show: true,
        message: 'Il sistema di monitoraggio è attualmente sospeso',
      })
    } else if (probingData.state === 'offline') {
      setAlert({
        show: true,
        message: 'L’e-service è offline perché non risponde al sistema di monitoraggio',
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
              <Grid item key={block}>
                <InformationContainer
                  key={block}
                  label={t(block).toUpperCase()}
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
                        {t('viewInCatalog')}
                      </Button>
                    </Grid>
                  }
                />
              </Grid>
            ) : (
              <Grid item key={block}>
                <InformationContainer
                  label={t(block).toUpperCase()}
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
              {t('realTimeTitle')}
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
              {t('reload')}
            </Button>
          </Grid>
          <Grid item container direction="column">
            {blocksInfo[1].blocks.map((block) => (
              <Grid item key={block}>
                <InformationContainer
                  key={block}
                  label={t(block).toUpperCase()}
                  content={
                    ['probingEnabled', 'state'].includes(block) ? (
                      <Chip
                        size={'small'}
                        label={
                          block === 'state'
                            ? probingData[block as keyof ProbingData]
                            : ChipLabel[probingData[block] as any]
                        }
                        color={ChipColor[probingData[block] as any]}
                      />
                    ) : (
                      (probingData['responseReceived' as keyof ProbingData] as string)
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
              {alert.message}
            </Alert>
          </Grid>
        )}
      </Grid>
    </>
  )
}
