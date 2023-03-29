import { Grid, Typography } from '@mui/material'
import MonitoringTable from '../../components/monitoringTable/MonitoringTable'

const MonitoringPage = () => {
  return (
    <Grid container sx={{ height: '100%' }} justifyContent="center">
      <Grid item sx={{ textAlign: 'center' }} my={5}>
        <Typography variant="h4">Stato degli e-service</Typography>
        <Typography variant="body1">
          In questa pagina puoi monitorare lo stato degli e-service messi a disposizione degli
          erogatori su PDND Interoperabilità
        </Typography>
      </Grid>
      <Grid item my={5} xs={10}>
        <MonitoringTable />
      </Grid>
    </Grid>
  )
}
export default MonitoringPage
