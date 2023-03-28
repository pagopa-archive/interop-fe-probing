import { Checkbox, FormControlLabel, Grid } from "@mui/material";

interface ILegendElement {
  label: string;
  color: string;
}

interface IProps {
  legendElements: ILegendElement[];
}

const ChartsLegend = ({ legendElements }: IProps) => {
  return (
    <Grid container direction="column">
      {legendElements.map((item: ILegendElement) => (
        <Grid item key={item.label}>
          <FormControlLabel
            label={item.label}
            sx={{
              cursor: "default !important",
              "& .MuiTypography-root": {
                color: "#17324D !important",
              },
              "& .MuiButtonBase-root": {
                color: "white !important",
                padding: "0px 9px",
              },
            }}
            disabled
            control={
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    zIndex: 1,
                  },
                  "& .PrivateSwitchBase-input": {
                    width: "auto",
                    height: "auto",
                    top: "auto",
                    left: "auto",
                    opacity: "1",
                    visibility: "hidden",

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      background: `${item.color}`,
                      height: "100%",
                      width: "100%",
                      visibility: "visible",
                    },
                  },
                }}
              />
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default ChartsLegend;
