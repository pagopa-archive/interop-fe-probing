import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import MonitoraggioSearchForm from "../../components/forms/monitoraggioSearchForm/monitoraggioSearchForm";
import MonitoraggioTable from "../../components/monitoraggioTable/MonitoraggioTable";
import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    field: "eService",
    headerName: "E-Service",
    flex: 1,
    sortable: true,
  },
  {
    field: "version",
    headerName: "Versione",
    flex: 1,
    sortable: true,
  },
  {
    field: "statusApi",
    headerName: "Stato API",
    flex: 1,
    sortable: true,
    renderCell: (params: any) => {
      return (
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {params.row.status === "active" ? (
              <CircleIcon color="success" />
            ) : (
              <CircleIcon color="error" />
            )}
          </Grid>
          <Grid item>{params.row.statusApi}</Grid>
        </Grid>
      );
    },
  },
  {
    field: "statusProbing",
    headerName: "Stato Probing",
    flex: 1,
    sortable: true,
    renderCell: (params: any) => {
      return params.row.status === "active" ? (
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 28,
            textTransform: "none",
            pointerEvents: "none",
          }}
        >
          Attivo
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          type="submit"
          color="error"
          sx={{
            borderRadius: 28,
            textTransform: "none",
            pointerEvents: "none",
          }}
        >
          Sospeso
        </Button>
        // <CircleIcon sx={{ color: red[500] }} />
      );
    },
  },
  {
    field: "actions",
    headerName: "",
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => <SearchIcon color="primary" />,
  },
];

const rows = [
  {
    id: 1,
    eService: "Test 1",
    version: "1",
    statusApi: "02/12/2022",
    statusProbing: "test",
    status: "active",
  },
  {
    id: 2,
    eService: "Test 2",
    version: "1",
    statusApi: "03/01/2023",
    statusProbing: "test",
    status: "active",
  },
  {
    id: 3,
    eService: "Test 3",
    version: "1",
    statusApi: "02/12/2022",
    statusProbing: "test",
    status: "stopped",
  },
  {
    id: 4,
    eService: "Test 4",
    version: "1",
    statusApi: "23/01/2023",
    statusProbing: "test",
    status: "active",
  },
];

const MonitaraggioPage = () => {
  return (
    <Grid container direction="column" spacing={1} sx={{ height: "100%" }}>
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
      <Grid item>
        <MonitoraggioSearchForm />
      </Grid>
      <Grid item sx={{ mt: 2 }} flexGrow={1}>
        <MonitoraggioTable columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
};
export default MonitaraggioPage;
