import { VegaLite, VisualizationSpec } from "react-vega";

const mainSpec: VisualizationSpec = {
  "title": {
    // the title of the chart
    "text": "Tempi di risposta dell’e-service",
    // align the title in the start; by default it is in the middle
    "anchor": "start",
  },
  "encoding": {
    "x": {
      // connected field from the values properties
      "field": "check_time",
      // "quantitative" if the field is a number
      // "nominal" if the field is a string
      // "temporal" if the field is a date time object
      "type": "temporal",
      // if the title is null it is removed
      "title": null,
      "axis": {
        "ticks": false,
        // so the labels have opacity
        "labelOpacity": 0.6,
        // so the labels in the x axe is not rotated
        "labelAngle": 0,
        // so the labels to be formatted as dd / MM
        "labelExpr": "date(datum.value) + ' / ' + (month(datum.value)+1)",
      },
    },
    "y": {
      "field": "response_time",
      "type": "quantitative",
      "title": null,
      "axis": {
        "grid": true,
        "labelOpacity": 0.6,
        "labelExpr": "datum.label + 'ms'",
      },
    },
  },
  // width and height of the chart
  "width": 400,
  "height": 200,
  // change the color of the x and y axis
  "config": { "axis": { "domainColor": "#ddd", "tickColor": "#ddd" } },
};

interface IService {
  name: string;
  status: string;
  response_time: number;
  check_time: string;
}

interface IProp {
  data: Array<IService>;
}

const LineChart = ({ data }: IProp) => {
  // crete specification layer from the given array of data
  const createLayer = (layerData: any) => {
    const status = layerData[0].status;
    return {
      "data": {
        "values": [...layerData],
        // type of the data, it can be "json", "csv", "tsv", "dsv"
      },
      "mark": {
        "type": "line",
        // so the line is dashed if the the status is KO or n/d
        "strokeDash": status === "KO" || status === "n/d" ? [4, 1] : null,
        // change the colors for the differnt status cases
        ...(status === "KO" && { color: "#FE6666" }),
        ...(status === "OK" && { color: "#17324D" }),
        ...(status === "n/d" && { color: "#A2ADB8" }),
        // so the lines don't have sharp edges
        "interpolate": "basis",
      },
    };
  };

  // split the data to different arrays(layers) by status and dates so we have diffent lines(layers)
  const createLayers = (items: any[]) => {
    const layers: any[] = [];
    let currentData: any[] = [];
    items.forEach((item, index) => {
      if (index === 0) {
        currentData.push(item);
      } else if (item.status === data[index - 1].status) {
        currentData.push(item);
        if (index + 1 == items.length) {
          layers.push(createLayer(currentData));
        }
      } else {
        layers.push(createLayer(currentData));
        currentData = [item];
      }
    });
    return layers;
  };

  // create specification with the main spec and the created layers
  // and return the ready chart
  const createChart = () => {
    const layers = createLayers(data);

    let spec: VisualizationSpec = {
      ...mainSpec,
      "layer": [...layers],
    };

    return <VegaLite spec={spec} actions={false} />;
  };

  return createChart();
};
export default LineChart;
