import { Chip, Grid, Link } from "@mui/material";
import { InformationContainer } from "@pagopa/interop-fe-commons";
import LaunchIcon from "@mui/icons-material/Launch";

interface IService {
  eService: string;
  regulator: string;
  version: string;
  statusMonitoring: string;
  statusService: string;
  statoLastDetection: string;
}

interface IProps {
  data: IService;
}

enum Labels {
  eService = "E-SERVICE",
  regulator = "EROGATORE",
  version = "VERSIONE",
  statusMonitoring = "STATO DEL MONITORAGGIO",
  statusService = "STATO DEL'E SERVICE",
  statoLastDetection = "STATO ULTIMA RILEVAZIONE",
}

const InformationBlock = ({ data }: IProps) => {
  return (
    <Grid container direction="column" alignContent={"center"} rowGap={1}>
      {Object.keys(data).map((key: string) => {
        return key === "eService" ? (
          <InformationContainer
            key={key}
            label={Labels[key as keyof typeof Labels]}
            labelDescription={data[key]}
            content={
              <Grid container>
                <Grid item>
                  <Link href="#" underline="hover">
                    Visualizza sul catalogo
                  </Link>
                </Grid>
                <Grid item>
                  <LaunchIcon color="primary" />
                </Grid>
              </Grid>
            }
          />
        ) : (
          <InformationContainer
            key={key}
            label={Labels[key as keyof typeof Labels]}
            content={
              ["statusMonitoring", "statusService"].includes(key) ? (
                <Chip
                  label={data[key as keyof IService]}
                  color={
                    ["attivo", "online"].includes(data[key as keyof IService])
                      ? "success"
                      : "error"
                  }
                />
              ) : (
                data[key as keyof IService]
              )
            }
          />
        );
      })}
    </Grid>
  );
};
export default InformationBlock;
