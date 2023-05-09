import { Grid, Typography, Button } from '@mui/material'
import { BarChart } from '../../components/charts/barChart/BarChart'
import { LineChart } from '../../components/charts/lineChart/LineChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { InformationBlock } from '../../components/informationBlock/InformationBlock'
import { ChartsLegend } from '../../components/charts/chartsLegend/ChartsLegend'

// data for the charts
const data = {
  // data for the bar chart
  percentages: [
    { status: 'E-service online', value: 90 },
    { status: 'Monitoraggio sospeso', value: 7 },
    { status: 'E-service offline', value: 15 },
  ],
  // data for the line chart
  // ordered by check_time
  values: [
    {
      name: 'es1',
      status: 'OK',
      response_time: 50,
      check_time: '2023-12-01T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 70,
      check_time: '2023-12-03T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 0,
      check_time: '2023-12-04T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'KO',
      response_time: 0,
      check_time: '2023-12-04T14:21:15.995Z',
    },
    {
      name: 'es1',
      status: 'KO',
      response_time: 0,
      check_time: '2023-12-06T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 0,
      check_time: '2023-12-06T14:30:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 100,
      check_time: '2023-12-06T14:35:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 0,
      check_time: '2023-12-08T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'n/d',
      response_time: 0,
      check_time: '2023-12-08T14:21:15.995Z',
    },
    {
      name: 'es1',
      status: 'n/d',
      response_time: 0,
      check_time: '2023-12-09T14:20:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 0,
      check_time: '2023-12-09T14:25:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 40,
      check_time: '2023-12-09T14:30:15.995Z',
    },
    {
      name: 'es1',
      status: 'OK',
      response_time: 40,
      check_time: '2023-12-10T14:20:15.995Z',
    },
  ],
}

// data for the information block
const serviceData = {
  eService: 'Probing test 3',
  regulator: 'Comune di Milano',
  version: '7',
  statusMonitoring: 'online',
  statusService: 'attivo',
  statusLastDetection: '03/12/2022, ore 13:30',
}

// elements for the legend component
const legendElements = [
  { label: 'E-service online', color: '#17324D' },
  { label: 'Monitoraggio sospeso', color: '#A2ADB8' },
  { label: 'E-service offline', color: '#FE6666' },
]

const reloadInfoBlock = (): void => {
  console.log('reload info block')
}

const goBack = (): void => {
  console.log('go back')
}

const viewInCatalogue = (): void => {
  console.log('view in catalogue')
}

export const DetailsServicePage: React.FC = () => {
  return (
    <Grid container direction="column" spacing={1} sx={{ height: '100%' }}>
      <Grid item sx={{ textAlign: 'center' }} my={5}>
        <Typography variant="h4" component="h1">
          Probing test 3
        </Typography>
        <Typography variant="body1">
          In questa pagina puoi verificare lo stato di un e-service in tempo reale ed esplorare lo
          storico delle performance
        </Typography>
      </Grid>
      <Grid item alignSelf={'center'} width={'40%'}>
        <InformationBlock
          data={serviceData}
          reloadInfoBlock={reloadInfoBlock}
          viewInCatalogue={viewInCatalogue}
        />
      </Grid>
      <Grid item sx={{ mt: 2 }} flexGrow={1}>
        <Typography
          sx={{
            fontSize: '1.4em',
            fontWeight: 'bold',
            color: '#17324D',
            textAlign: 'center',
          }}
        >
          Storico del monitoraggio
        </Typography>
        <Grid item container justifyContent="center" gap={10}>
          <Grid item>
            <LineChart data={data.values} />
          </Grid>
          <Grid item>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <BarChart data={data.percentages} />
              </Grid>
              <Grid item>
                <ChartsLegend legendElements={legendElements} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
            onClick={goBack}
          >
            Torna alla lista degli e-service
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
