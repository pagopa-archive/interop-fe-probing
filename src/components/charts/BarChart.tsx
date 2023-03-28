import { Grid } from "@mui/material";
import { VegaLite, VisualizationSpec } from "react-vega";
import ChartsLegend from "./ChartsLegend";

const mainSpec: VisualizationSpec = {
  "title": {
    "text": "Performance dell’e-service",
    "anchor": "start",
  },
  "encoding": {
    "x": {
      // connected field from the values properties
      "field": "value",
      // "quantitative" if the field is a number
      // "nominal" if the field is a string
      // "temporal" if the field is a date time object
      "type": "quantitative",
      // if the title is null it is removed
      "title": null,
      // remove the axis
      "axis": null,
    },
    "y": {
      "field": "status",
      "title": null,
      "type": "ordinal",
      "axis": null,
      // without sorting
      // the bars can be sorted by some value; by default ascending order
      "sort": null,
    },
    "color": {
      // to hide the legend
      "legend": null,
      "field": "status",
      "type": "nominal",
      "title": null,
      // color the bar parts
      "scale": {
        "domain": [
          "E-service online",
          "Monitoraggio sospeso",
          "E-service offline",
        ],
        "range": ["#17324D", "#A2ADB8", "#FE6666"],
        "type": "ordinal",
      },
    },
  },
  "config": {
    "view": {
      // hide the borders
      "stroke": "transparent",
    },
  },
  // put the values in the right of the bar rectangles as a different layer
  "layer": [
    {
      "mark": "bar",
    },
    {
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 3,
        "fill": "#17324D",
        "fontWeight": "bold",
        "fontSize": 15,
        "text": { "signal": "datum.value + '%'" },
      },
    },
  ],
  // height and width of the plot
  "height": 120,
  "width": 300,
};

// elements for the legend component
const legendElements = [
  { label: "E-service online", color: "#17324D" },
  { label: "Monitoraggio sospeso", color: "#A2ADB8" },
  { label: "E-service offline", color: "#FE6666" },
];

interface IService {
  status: string;
  value: number;
}

interface IProps {
  data: Array<IService>;
}

const BarChart = ({ data }: IProps) => {
  // create specification with the main spec and the value
  // and return the ready chart
  const createChart = () => {
    let spec: VisualizationSpec = {
      ...mainSpec,
      "data": {
        // type of the data, it can be "json", "csv", "tsv", "dsv"
        "values": [...data],
      },
    };
    return <VegaLite spec={spec} actions={false} />;
  };

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>{createChart()}</Grid>
      <Grid item>
        <ChartsLegend legendElements={legendElements} />
      </Grid>
    </Grid>
  );
};
export default BarChart;
