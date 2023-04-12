import { Grid, Typography } from "@mui/material";
import { BarChart } from "../../components/charts/BarChart";
import { LineChart } from "../../components/charts/LineChart";
import ChartsLegend from "../../components/chartsVega/ChartsLegend";
// import BarChart from "../../components/charts/BarChart";
import InformationBlock from "../../components/informationBlock/InformationBlock";

// data for the charts
const data = {
  // data for the bar chart
  percentages: [
    { "status": "E-service online", "value": 90 },
    { "status": "Monitoraggio sospeso", "value": 7 },
    { "status": "E-service offline", "value": 15 },
  ],
  // data for the line chart
  // ordered by check_time
  values: [
    {
      "name": "es1",
      "status": "OK",
      "response_time": 50,
      "check_time": "2023-12-01T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 70,
      "check_time": "2023-12-03T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 0,
      "check_time": "2023-12-04T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "KO",
      "response_time": 0,
      "check_time": "2023-12-04T14:21:15.995Z",
    },
    {
      "name": "es1",
      "status": "KO",
      "response_time": 0,
      "check_time": "2023-12-06T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 0,
      "check_time": "2023-12-06T14:30:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 100,
      "check_time": "2023-12-06T14:35:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 0,
      "check_time": "2023-12-08T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "n/d",
      "response_time": 0,
      "check_time": "2023-12-08T14:21:15.995Z",
    },
    {
      "name": "es1",
      "status": "n/d",
      "response_time": 0,
      "check_time": "2023-12-09T14:20:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 0,
      "check_time": "2023-12-09T14:25:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 40,
      "check_time": "2023-12-09T14:30:15.995Z",
    },
    {
      "name": "es1",
      "status": "OK",
      "response_time": 40,
      "check_time": "2023-12-10T14:20:15.995Z",
    },
  ],
};

// data for the information block
const serviceData = {
  eService: "In questa pagina puoi monitorare lo stato dell’e-service",
  regulator: "Comune di Milano",
  version: "7",
  statusMonitoring: "online",
  statusService: "attivo",
  statoLastDetection: "03/12/2022, ore 13:30",
};

// elements for the legend component
const legendElements = [
  { label: "E-service online", color: "#17324D" },
  { label: "Monitoraggio sospeso", color: "#A2ADB8" },
  { label: "E-service offline", color: "#FE6666" },
];

const DettaglioServicePage = () => {
  return (
    <Grid container direction="column" spacing={1} sx={{ height: "100%" }}>
      <Grid item sx={{ textAlign: "center" }} my={5}>
        <Typography
          sx={{ fontSize: "1.6em", fontWeight: "bold", color: "#17324D" }}
        >
          Probing test 3
        </Typography>
        <Typography variant="body1" sx={{ color: "#17324D" }}>
          In questa pagina puoi monitorare lo stato dell’e-service
        </Typography>
      </Grid>
      <Grid item>
        <InformationBlock data={serviceData} />
      </Grid>
      <Grid item sx={{ mt: 2 }} flexGrow={1}>
        <Typography
          sx={{
            fontSize: "1.4em",
            fontWeight: "bold",
            color: "#17324D",
            textAlign: "center",
          }}
        >
          Monitoraggio
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
      </Grid>
    </Grid>
  );
};
export default DettaglioServicePage;
