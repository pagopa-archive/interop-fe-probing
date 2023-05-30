import { Grid, Typography } from '@mui/material'
import { BarChart } from '../../components/charts/barChart/BarChart'
import { LineChart } from '../../components/charts/lineChart/LineChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MainDataInformationBlock } from '../../components/informationBlock/MainDataInformationBlock'
import { ProbingDataInformationBlock } from '../../components/informationBlock/ProbingDataInformationBlock'
import { ChartsLegend } from '../../components/charts/chartsLegend/ChartsLegend'
import { useQuery } from '@tanstack/react-query'
import apiRequests from '../../api/apiRequests'
import { useTranslation } from 'react-i18next'
import stores from '../../store/Store'
import { useNavigate, useParams } from 'react-router-dom'
import { MainDataSkeleton } from '../../components/skeleton/MainDataSkeleton'
import { ProbingDataSkeleton } from '../../components/skeleton/ProbingDataSkeleton'
import { ChartSkeleton } from '../../components/skeleton/ChartSkeleton'
import { ServiceMainData, ServiceProbingData, ServiceStatisticsData } from '../../types'
import { ButtonNaked } from '@pagopa/mui-italia'

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

  async function fetchServiceStatisticsData(
    eserviceRecordId: string,
    pollingFrequency: number | undefined
  ): Promise<ServiceStatisticsData> {
    let payload = {
      eserviceRecordId: eserviceRecordId,
      pollingFrequency: pollingFrequency,
    }
    return apiRequests.getServiceStatisticsData(payload)
  }

  const { data: mainData, isInitialLoading: mainDataLoading } = useQuery({
    queryKey: ['serviceMainData', eserviceRecordId],
    queryFn: () => fetchServiceMainData(eserviceRecordId),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
  })

  const {
    data: probingData,
    isInitialLoading: probingDataLoading,
    refetch,
  } = useQuery({
    queryKey: ['serviceProbingData', eserviceRecordId],
    queryFn: () => fetchServiceProbingData(eserviceRecordId),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
    keepPreviousData: false,
  })

  const { data: statisticsData, isInitialLoading: statisticsDataLoading } = useQuery({
    queryKey: ['serviceStatisticsData', eserviceRecordId, mainData?.pollingFrequency],
    queryFn: () => fetchServiceStatisticsData(eserviceRecordId, mainData?.pollingFrequency),
    onError: (error) => updateSnackbar(true, t('errorRequest', { ns: 'general' }), 'error'),
    enabled: !!mainData?.pollingFrequency,
  })

  return (
    <>
      <Grid container direction="column" spacing={1} sx={{ height: '100%', bgcolor: 'white' }}>
        {mainDataLoading || !mainData ? (
          <MainDataSkeleton />
        ) : (
          <>
            <Grid container item direction="column" sx={{ textAlign: 'center' }} my={5} rowGap={2}>
              <Grid item>
                <Typography variant="h4" component="h1">
                  {mainData?.eserviceName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{t('subtitle', { ns: 'detailsPage' })}</Typography>
              </Grid>
            </Grid>
            <Grid item alignSelf={'center'} width={'40%'}>
              <MainDataInformationBlock mainData={mainData} viewInCatalogue={viewInCatalogue} />
            </Grid>
          </>
        )}
        {probingDataLoading || !probingData ? (
          <ProbingDataSkeleton />
        ) : (
          <Grid item alignSelf={'center'} width={'40%'}>
            <ProbingDataInformationBlock probingData={probingData} reloadProbingDetails={refetch} />
          </Grid>
        )}
        {statisticsDataLoading ? (
          <Grid item sx={{ mt: 2 }} flexGrow={1}>
            <Grid item container justifyContent="center" gap={10}>
              <Grid item>
                <ChartSkeleton width={600} height={415} />
              </Grid>
              <Grid item>
                <Grid container direction="column" rowSpacing={2}>
                  <Grid item>
                    <ChartSkeleton width={360} height={200} />
                  </Grid>
                  <Grid item>
                    <ChartSkeleton width={360} height={200} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container item direction="column" sx={{ mt: 2 }} flexGrow={1} rowGap={6}>
            <Grid item>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                }}
              >
                {t('chartsTitle', { ns: 'detailsPage' })}
              </Typography>
            </Grid>
            <Grid item container justifyContent="center" gap={10}>
              {statisticsData?.values && (
                <Grid item>
                  <LineChart data={statisticsData?.values} />
                </Grid>
              )}
              {statisticsData?.percentages && (
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
              )}
            </Grid>
          </Grid>
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
          <ButtonNaked
            onClick={() => navigate(-1)}
            color="primary"
            size="small"
            startIcon={<ArrowBackIcon />}
          >
            {t('goBack', { ns: 'detailsPage' })}
          </ButtonNaked>
        </Grid>
      </Grid>
    </>
  )
}
