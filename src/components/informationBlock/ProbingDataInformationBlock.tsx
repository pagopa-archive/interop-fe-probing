import { Chip, Grid, Typography } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'
import { ProbingDataAlert } from '../probingDataAlert/ProbingDataAlert'
import { ServiceProbingData } from '../../types'
import { ButtonNaked } from '@pagopa/mui-italia'

interface IProps {
  probingData: ServiceProbingData
  reloadProbingDetails: () => void
}
const blocksInfo: Array<string> = ['probingEnabled', 'state', 'responseReceived']

export const ProbingDataInformationBlock: React.FC<IProps> = ({
  probingData,
  reloadProbingDetails,
}) => {
  const { t } = useTranslation(['detailsPage', 'general'])

  const getChipColor = (value: string) => {
    switch (value) {
      case 'ONLINE':
      case 'true':
        return 'success'
      case 'OFFLINE':
      case 'false':
        return 'error'
      case 'N/D':
        return 'warning'
    }
  }

  const getChipLabel = (value: boolean) => {
    switch (value) {
      case true:
        return 'active'
      case false:
        return 'suspended'
    }
  }

  return (
    <>
      <>
        <Grid item container direction="column">
          <Grid item textAlign={'center'}>
            <Typography variant="h5">{t('realTimeTitle', { ns: 'detailsPage' })}</Typography>
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
            <ButtonNaked
              color="primary"
              onClick={() => reloadProbingDetails()}
              size="small"
              startIcon={<RefreshIcon />}
            >
              {t('refresh', { ns: 'general' })}
            </ButtonNaked>
          </Grid>
          <Grid item container direction="column">
            {blocksInfo.map((block) => (
              <Grid item key={block}>
                <InformationContainer
                  key={block}
                  label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                  content={
                    ['probingEnabled', 'state'].includes(block) ? (
                      <Chip
                        size={'small'}
                        label={
                          block === 'state'
                            ? probingData[block as keyof ServiceProbingData]
                                .toString()
                                .toLowerCase()
                            : t(getChipLabel(probingData.probingEnabled), {
                                ns: 'detailsPage',
                              })
                        }
                        color={getChipColor(
                          probingData[block as keyof ServiceProbingData].toString()
                        )}
                      />
                    ) : probingData['responseReceived'] ? (
                      format(
                        new Date(probingData['responseReceived']),
                        t('dateFormat', {
                          ns: 'general',
                        })
                      )
                    ) : (
                      ''
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <ProbingDataAlert
          probingEnabled={probingData.probingEnabled}
          state={probingData.state}
          eserviceActive={probingData.eserviceActive}
        />
      </>
    </>
  )
}
