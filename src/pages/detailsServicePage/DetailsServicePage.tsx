import { Grid, Typography, Button, Alert } from '@mui/material'
import { BarChart } from '../../components/charts/barChart/BarChart'
import { LineChart } from '../../components/charts/lineChart/LineChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { InformationBlock } from '../../components/informationBlock/InformationBlock'
import { ChartsLegend } from '../../components/charts/chartsLegend/ChartsLegend'
import { useQuery } from '@tanstack/react-query'
import apiRequests from '../../api/apiRequests'
import { useTranslation } from 'react-i18next'
import stores from '../../store/Store'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailsServicePageSkeleton } from '../../components/skeleton/DetailsServicePageSkeleton'
import { ServiceMainData, ServiceProbingData, ServiceStatisticsData } from '../../types'

const viewInCatalogue = (): void => {
  console.log('view in catalogue')
}

export const DetailsServicePage: React.FC = () => {
  const { t } = useTranslation(['general', 'detailsPage'])

  const navigate = useNavigate()

  const params = useParams()

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  // elements for the legend component
  const legendElements = [
    { label: 'E-service online', color: '#17324D' },
    { label: t('monitoringSuspended', { ns: 'detailsPage' }), color: '#A2ADB8' },
    { label: 'E-service offline', color: '#FE6666' },
  ]

  const eserviceRecordId = params.id ?? ''

  async function fetchServiceMainData(value: string): Promise<ServiceMainData> {
    return apiRequests.getServiceMainData(value)
  }

  async function fetchServiceProbingData(value: string): Promise<ServiceProbingData> {
    return apiRequests.getServiceProbingData(value)
  }

  async function fetchServiceStatisticsData(value: string): Promise<ServiceStatisticsData> {
    return apiRequests.getServiceStatisticsData(value)
  }

  const {
    data: mainData,
    isSuccess: mainDataReady,
    isInitialLoading: mainDataLoading,
  } = useQuery({
    queryKey: ['serviceMainData', eserviceRecordId],
    queryFn: () => fetchServiceMainData(eserviceRecordId),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
  })

  const {
    data: probingData,
    isSuccess: probingDataReady,
    isInitialLoading: probingDataLoading,
    refetch,
  } = useQuery({
    queryKey: ['serviceProbingData', eserviceRecordId],
    queryFn: () => fetchServiceProbingData(eserviceRecordId),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
    keepPreviousData: false,
  })

  const {
    data: statisticsData,
    isSuccess: statisticsDataReady,
    isInitialLoading: statisticsDataLoading,
  } = useQuery({
    queryKey: ['serviceStatisticsData', eserviceRecordId],
    queryFn: () => fetchServiceStatisticsData(eserviceRecordId),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
  })

  return (
    <>
      {mainDataLoading || probingDataLoading || statisticsDataLoading ? (
        <DetailsServicePageSkeleton />
      ) : (
        <Grid container direction="column" spacing={1} sx={{ height: '100%' }}>
          {mainDataReady && probingDataReady && statisticsDataReady ? (
            <>
              <Grid item sx={{ textAlign: 'center' }} my={5}>
                <Typography variant="h4" component="h1">
                  {mainData.eserviceName}
                </Typography>
                <Typography variant="body1">{t('subtitle', { ns: 'detailsPage' })}</Typography>
              </Grid>
              <Grid item alignSelf={'center'} width={'40%'}>
                <InformationBlock
                  mainData={mainData}
                  probingData={probingData}
                  reloadProbingDetails={refetch}
                  viewInCatalogue={viewInCatalogue}
                />
              </Grid>
              <Grid item sx={{ mt: 2 }} flexGrow={1}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {t('chartsTitle', { ns: 'detailsPage' })}
                </Typography>
                <Grid item container justifyContent="center" gap={10}>
                  <Grid item>
                    <LineChart data={statisticsData.values} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" rowSpacing={2}>
                      <Grid item>
                        <BarChart data={statisticsData.percentages} />
                      </Grid>
                      <Grid item>
                        <ChartsLegend legendElements={legendElements} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <Alert severity="info">{t('errorRequest', { ns: 'general' })}</Alert>
          )}
          <Grid
            item
            container
            my={10}
            direction={'row'}
            alignItems={'center'}
            justifyItems={'center'}
            justifyContent={'center'}
          >
            <Button
              onClick={() => navigate(-1)}
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
              startIcon={<ArrowBackIcon />}
            >
              {t('goBack', { ns: 'detailsPage' })}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}
