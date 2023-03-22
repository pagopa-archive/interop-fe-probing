import { Grid, Typography } from "@mui/material";
import MonitoringTable from "../../components/monitoringTable/MonitoringTable";

const MonitoringPage = () => {
  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid item sx={{ textAlign: "center" }} my={5}>
        <Typography
          sx={{ fontSize: "1.6em", fontWeight: "bold", color: "#17324D" }}
        >
          Stato degli e-service
        </Typography>
        <Typography variant="body1" sx={{ color: "#17324D" }}>
          In questa pagina puoi monitorare lo stato degli e-service messi a
          disposizione degli erogatori su PDND Interoperabilità
        </Typography>
      </Grid>
      <Grid item sx={{ mt: 2 }} flexGrow={1}>
        <MonitoringTable />
      </Grid>
    </Grid>
  );
};
export default MonitoringPage;
