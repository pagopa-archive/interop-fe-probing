import { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleTime,
  axisBottom,
  axisLeft,
  line,
  timeFormat,
  curveBasis,
  max,
  curveNatural,
  curveBundle,
  curveBasisOpen,
  curveCardinal,
  ScaleTime,
  ScaleLinear,
} from "d3";
import _ from "lodash";

const curveType = curveBasis;
const DASH_LENGTH = 2;
const DASH_SEPARATOR_LENGTH = 2;

interface IService {
  name: string;
  status: string;
  response_time: number;
  check_time: string;
}

interface IProps {
  data: Array<IService>;
}

// margin convention often used with D3
const margin = { top: 20, right: 30, bottom: 40, left: 60 };
const width = 700 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

const color: { [key: string]: string } = {
  "OK": "#17324D",
  "n/d": "#A2ADB8",
  "KO": "#FE6666",
};

export const LineChart: React.FC<IProps> = ({ data }) => {
  //refs
  const d3svg = useRef(null);

  useEffect(() => {
    if (data && d3svg.current) {
      // append the svg object to our svg and set the width and height
      let svg = select(d3svg.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // draw header
      svg
        .append("g")
        .attr("class", "bar-header")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .append("text")
        .append("tspan")
        .attr("font-family", "Titillium Web")
        .attr("font-size", "18px")
        .attr("color", "#17324D")
        .attr("font-weight", "700")
        .text("Tempi di risposta dell’e-service");

      // create axis
      const xScale = scaleTime()
        .range([0, width])
        .domain([
          // get the previous date of the first check_date in the array
          // because the chart is not including the first one
          new Date(
            new Date(data[0].check_time).setDate(
              new Date(data[0].check_time).getDate() - 1
            )
          ),
          new Date(data[data.length - 1].check_time),
        ]);

      const yScale = scaleLinear()
        .domain([
          0,
          max(data, (d: IService) => {
            return d.response_time || null;
          }),
        ] as Array<number>)

        .range([height, 0]);

      // create common element where to append the axises
      svg
        .append("g")
        .attr("class", "scales")
        .attr("transform", `translate(${margin.left}, ${margin.top * 1.5})`);

      // add x axis
      svg
        .select(".scales")
        .append("g")
        // change ticks style
        .attr("transform", `translate(0, ${height})`)
        .attr("font-family", "Poppins")
        .attr("opacity", 0.4)
        .call(
          axisBottom(xScale)
            .tickPadding(15)
            .tickSize(0)
            // format the ticks labels to be dd / mm
            .tickFormat((date: any) => {
              return timeFormat("%d / %m")(new Date(date));
            })
        )

        .call((g) => {
          // create the grid vertical lines
          g.selectAll(".tick line")
            .attr("transform", `translate(0, ${-height})`)
            .clone()
            .attr("y2", height)
            .attr("stroke-opacity", 0.05);
          // hide the axis line
          g.select(".domain").remove();
        });

      // add y axis
      svg
        .select(".scales")
        .append("g")
        // change ticks style
        .attr("font-family", "Poppins")
        .attr("opacity", 0.4)
        .call(
          axisLeft(yScale)
            .tickPadding(15)
            .tickSize(0)
            // format the ticks labels adding ms in the end
            .tickFormat((data: any) => {
              return `${data}ms`;
            })
        )
        // create the horizontal grid lines
        .call((g) => {
          g.selectAll(".tick line")
            .clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.05);
          // hide the axis line
          g.select(".domain").remove();
        });

      // create the line
      const valueLine = line<IService>()
        // .curve(curveType)
        .x((d: IService) => {
          return xScale(new Date(d.check_time));
        })
        .y((d: IService) => yScale(d.response_time));

      // color the line in different colors depending on the status
      svg
        .append("linearGradient")
        .attr("id", "linearGradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("x2", width)
        .selectAll("stop")
        .data(data)

        .join("stop")
        .attr("offset", (d: IService) => xScale(new Date(d.check_time)) / width)
        .attr("stop-color", (d: IService) => {
          return color[d.status];
        })
        .attr("stop-opacity", 1);

      // add the line to the chart
      svg
        .append("path")
        .attr("class", "line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "url(#linearGradient)")
        .attr("stroke-width", 1)
        .attr("transform", `translate(${margin.left}, ${margin.top * 1.5})`)
        .attr("d", valueLine);
      // .attr("stroke-dasharray", function (d) {
      //   return getDashArray(d, this, xScale, yScale);
      // });
    }
  }, []);

  // // get the dash array for the stroke-dasharray property
  // const getDashArray = (
  //   data: Array<IService>,
  //   path: SVGPathElement,
  //   xScale: ScaleTime<number, number, never>,
  //   yScale: ScaleLinear<number, number, never>
  // ): Array<number | string> | null => {
  //   const dashedRanges = getDashedRanges(data);
  //   if (dashedRanges.length === 0) return null;
  //   const lengths = data.map((d) =>
  //     getLengthForPoint(
  //       {
  //         x: xScale(new Date(d.check_time)),
  //         y: yScale(new Date(d.response_time)),
  //       },
  //       path
  //     )
  //   );
  //   const dashArr = buildDashArray(dashedRanges, lengths);
  //   return dashArr;
  // };

  // // get array with pointes between which points we have dashed parts
  // // for example betwewen the elements with indexes 3 and 4, and 8 and 9 from tha data array
  // // [{ start: 3, end: 4 }, { start: 8, end: 9 }]
  // const getDashedRanges = (data: Array<IService>): Array<any> => {
  //   const hasOpenRange = (arr: Array<any>) =>
  //     _.last(arr) && !("end" in _.last(arr));
  //   const lastIndex = data.length - 1;
  //   return _.reduce(
  //     data,
  //     (res: Array<any>, d: IService, i: number) => {
  //       const isRangeStart = !hasOpenRange(res) && isDashed(d);
  //       if (isRangeStart) res.push({ start: Math.max(0, i) });

  //       const isRangeEnd =
  //         hasOpenRange(res) && (!isDashed(d) || i === lastIndex);
  //       if (isRangeEnd) res[res.length - 1].end = i - 1;
  //       return res;
  //     },
  //     []
  //   );
  // };

  // // the length from the start of x axis to the point
  // function getLengthForPoint(
  //   point: { x: number; y: number },
  //   thePath: SVGPathElement
  // ) {
  //   let pathLength = thePath.getTotalLength();
  //   let precision = 100;
  //   let division = pathLength / precision;
  //   let theRecord = pathLength;
  //   let theSegment: number = 0;

  //   for (let i = 0; i < precision; i++) {
  //     // get a point on the path for thia distance
  //     let _p = thePath.getPointAtLength(i * division);
  //     // get the distance between the new point _p and the point p
  //     let theDistance = dist(_p, point);
  //     if (theDistance < theRecord) {
  //       // if the distance is smaller than the record set the new record
  //       theRecord = theDistance;
  //       theSegment = i;
  //     }
  //   }
  //   return theSegment * division;
  // }

  // // math formula for calculating the distance between two points
  // function dist(p1: DOMPoint, p2: { x: number; y: number }) {
  //   let dx = p2.x - p1.x;
  //   let dy = p2.y - p1.y;
  //   return Math.sqrt(dx * dx + dy * dy);
  // }

  // // builds the whole array for the stroke-dasharray property
  // function buildDashArray(
  //   dashedRanges: { end: number; start: number }[],
  //   lengths: Array<number>
  // ) {
  //   const dashArr = _.reduce(
  //     dashedRanges,
  //     (res: Array<any>, { start, end }, i) => {
  //       const prevEnd = i === 0 ? 0 : dashedRanges[i - 1].end;
  //       const normalSegment = lengths[start] - lengths[prevEnd];
  //       const dashedSegment = getDashedSegment(lengths[end] - lengths[start]);
  //       return res.concat(normalSegment, dashedSegment);
  //     },
  //     []
  //   );
  //   return dashArr;
  // }

  // // get the part of the stroke-dasharray property for some of the dashed parts
  // function getDashedSegment(length: number): string | undefined {
  //   const totalDashLen = DASH_LENGTH + DASH_SEPARATOR_LENGTH;
  //   const dashCount = Math.floor(length / totalDashLen);
  //   const result: any[] = _.range(dashCount).map(() => {
  //     return DASH_SEPARATOR_LENGTH + "," + DASH_LENGTH;
  //   });
  //   return result.concat(length - dashCount * totalDashLen).join(",");
  // }

  // // check if this point is part of a dashed segment
  // function isDashed(d: IService) {
  //   return d.status != "OK";
  // }

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      ref={d3svg}
    ></svg>
  );
};
