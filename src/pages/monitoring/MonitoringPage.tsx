import { Grid, Typography } from '@mui/material'
import MonitoringTable from '../../components/monitoringTable/MonitoringTable'
import { useTranslation } from 'react-i18next'

const MonitoringPage = () => {
  const { t } = useTranslation(['monitorPage'])

  return (
    <Grid container sx={{ height: '100%', bgcolor: 'white' }} justifyContent="center">
      <Grid item sx={{ textAlign: 'center' }} my={5}>
        <Typography variant="h4" component="h1">
          {t('title')}
        </Typography>
        <Typography variant="body1">{t('subtitle')}</Typography>
      </Grid>
      <Grid item my={5} xs={10}>
        <MonitoringTable />
      </Grid>
    </Grid>
  )
}
export default MonitoringPage
