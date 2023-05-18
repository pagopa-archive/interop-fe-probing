import { scaleLinear, scaleTime, line, timeFormat, max, Line, ScaleLinear, ScaleTime } from 'd3'
import { useTranslation } from 'react-i18next'
import { ServiceValuesType } from '../../../types'

interface IProps {
  data: Array<ServiceValuesType>
}

// margin convention often used with D3
const margin = { top: 20, right: 30, bottom: 40, left: 60 }
const width = 700 - margin.left - margin.right
const height = 350 - margin.top - margin.bottom

const color: { [key: string]: string } = {
  OK: '#17324D',
  'n/d': '#A2ADB8',
  KO: '#FE6666',
}

/**
 * Line chart component
 * @component
 */
export const LineChart: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation(['detailsPage'])

  // header of the chart
  const header: JSX.Element = (
    <g className="bar-header" transform={`translate(${margin.left}, ${margin.top})`}>
      <text>
        <tspan fontFamily="Titillium Web" fontSize="18px" color="#17324D" fontWeight="700">
          {t('lineChartTitle')}
        </tspan>
      </text>
    </g>
  )

  //x scale
  const x: ScaleTime<number, number, never> = scaleTime()
    .range([0, width])
    .domain([
      // get the previous date of the first check_date in the array
      // because the chart is not including the first one
      new Date(new Date(data[0].time).setDate(new Date(data[0].time).getDate() - 1)),
      new Date(data[data.length - 1].time),
    ])

  //y scale
  const y: ScaleLinear<number, number, never> = scaleLinear()
    .domain([
      0,
      max(data, (d: ServiceValuesType) => {
        return d.responseTime || null
      }),
    ] as Array<number>)

    .range([height, 0])

  // create the x ticks and create from them the vertical lines of the grid
  const xTicks: JSX.Element = (
    <g
      transform={`translate(0, ${height})`}
      fontFamily="Poppins"
      opacity={0.4}
      fontSize={10}
      textAnchor="middle"
    >
      {x.ticks().map((d: Date) => (
        <g opacity="1" className="tick" transform={`translate(${x(d)}, 0)`} key={d.getTime()}>
          <line
            y2={0}
            transform={`translate(0, ${-height})`}
            strokeOpacity="0.05"
            stroke="currentColor"
          />
          <line
            y2={height}
            transform={`translate(0, ${-height})`}
            strokeOpacity="0.05"
            stroke="currentColor"
          />
          <text y="15" dy="0.71em">
            {timeFormat('%d / %m')(new Date(d))}
          </text>
        </g>
      ))}
    </g>
  )

  // create the y ticks and create from them the horizontal lines of the grid
  const yTicks: JSX.Element = (
    <g fontFamily="Poppins" opacity={0.4} fontSize={10} textAnchor="end">
      {y.ticks().map((d) => (
        <g key={d} opacity="1" className="tick" transform={`translate(0, ${y(d)})`}>
          <line stroke="currentColor" x2={0} strokeOpacity="0.05" />
          <line stroke="currentColor" x2={width} strokeOpacity="0.05" />
          <text x="-15" dy="0.32em">{`${d}ms`}</text>
        </g>
      ))}
    </g>
  )

  //line generator: each point is [x(d.time), y(d.responseTime)] where d is an element in data array
  // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
  const createLine: Line<ServiceValuesType> = line<ServiceValuesType>()
    .x((d: ServiceValuesType) => {
      return x(new Date(d.time))
    })
    .y((d: ServiceValuesType) => y(d.responseTime))

  // create linear gradient to color the line in different colors depending on the status
  const linearGradient: JSX.Element = (
    <linearGradient id="linearGradient" gradientUnits="userSpaceOnUse" x1="0" x2={width}>
      {data.map((d: ServiceValuesType) => (
        <stop
          key={new Date(d.time).getTime()}
          offset={x(new Date(d.time)) / width}
          stopColor={color[d.status]}
          stopOpacity="1"
        ></stop>
      ))}
    </linearGradient>
  )

  return (
    <svg
      className="line-chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
    >
      {header}
      <g className="scales" transform={`translate(${margin.left}, ${margin.top * 1.5})`}>
        {xTicks}
        {yTicks}
      </g>
      {linearGradient}
      <path
        className="line"
        stroke="url(#linearGradient)"
        strokeWidth="1"
        fill="none"
        d={createLine(data) || undefined}
        transform={`translate(${margin.left}, ${margin.top * 1.5})`}
      />
    </svg>
  )
}
