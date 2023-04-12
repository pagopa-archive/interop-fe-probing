import { useEffect, useRef } from "react";

import { select, max, scaleLinear, scaleBand } from "d3";

interface IService {
  status: string;
  value: number;
}

interface IProps {
  data: Array<IService>;
}
// margin convention often used with D3
const margin = { top: 20, right: 30, bottom: 20, left: 30 };
const width = 300;
const height = 200;

const color = ["#17324D", "#A2ADB8", "#FE6666"];

export const BarChart: React.FC<IProps> = ({ data }) => {
  const d3svg = useRef(null);

  useEffect(() => {
    if (data && d3svg.current) {
      let svg = select(d3svg.current);

      // scales
      const xMax = max(data, (d: IService) => d.value) as number;

      const xScale = scaleLinear().domain([0, xMax]).range([0, width]);

      const yScale = scaleBand()
        .domain(data.map((d) => d.status))
        .rangeRound([0, height - margin.left])
        .paddingInner(0.25);

      // draw header
      svg
        .append("g")
        .attr("class", "bar-header")
        .attr("transform", `translate(0, ${margin.top})`)
        .append("text")
        .append("tspan")
        .attr("font-family", "Titillium Web")
        .attr("font-size", "18px")
        .attr("color", "#17324D")
        .attr("font-weight", "700")
        .text("Performance dell’e-service");

      // draw bars
      svg
        .append("g")
        .attr("transform", `translate(0, ${margin.top * 2})`)
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d: IService) => yScale(d.status) as number)
        .attr("width", (d: IService) => xScale(d.value) as number)
        .attr("height", yScale.bandwidth())
        .style("fill", function (d: IService, i: number) {
          return color[i % 4]; // use colors in sequence
        });

      // labels in right of the bars
      svg
        .selectAll(".rect")
        .data(data)
        .enter()
        .append("text")
        .text((d: IService) => d.value + "%")
        .attr("x", (d: IService) => xScale(d.value) as number)
        .attr("y", (d: IService) => yScale(d.status) as number)
        .attr("font-family", "Titillium Web")
        .attr("font-size", "24px")
        .attr("color", "#17324D")
        .attr("font-weight", "600")
        .attr("transform", `translate(10, ${yScale.bandwidth() * 1.5})`);
    }
  }, [data]);

  return (
    <svg
      className="bar-chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
      ref={d3svg}
    ></svg>
  );
};
