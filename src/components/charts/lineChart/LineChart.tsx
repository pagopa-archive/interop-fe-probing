import {
  scaleLinear,
  scaleTime,
  line,
  timeFormat,
  max,
  Line,
  ScaleLinear,
  ScaleTime,
  curveCatmullRom,
} from 'd3'
import { useTranslation } from 'react-i18next'
import { ServicePerformancesType, ServiceFailuresType } from '../../../types'
import { Grid } from '@mui/material'
import { subMonths, isAfter, addMonths } from 'date-fns'

const curveType = curveCatmullRom.alpha(0.5)

interface IProps {
  data: Array<ServicePerformancesType>
  failures: Array<ServiceFailuresType>
  startDate?: string
  endDate?: string
}

// margin convention often used with D3
const margin = { top: 20, right: 30, bottom: 80, left: 60 }
const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const color: { [key: string]: string } = {
  OK: '#17324D',
  'N/D': '#A2ADB8',
  KO: '#FE6666',
}

/**
 * Line chart component
 * @component
 */
export const LineChart: React.FC<IProps> = ({ data, failures, startDate, endDate }) => {
  const { t } = useTranslation(['detailsPage'])

  // header of the chart
  const header: JSX.Element = (
    <g className="bar-header" transform={`translate(10, ${margin.top})`}>
      <text>
        <tspan fontFamily="Titillium Web" fontSize="18px" color="#17324D" fontWeight="700">
          {t('lineChartTitle')}
        </tspan>
      </text>
    </g>
  )

  const minTime = startDate
    ? new Date(startDate)
    : endDate
    ? subMonths(new Date(endDate), 3)
    : new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)

  const maxTime = endDate
    ? new Date(endDate)
    : startDate && !isAfter(addMonths(new Date(startDate), 3), new Date())
    ? addMonths(new Date(startDate), 3)
    : new Date()

  //x scale
  const x: ScaleTime<number, number, never> = scaleTime()
    .range([0, width])
    .domain([minTime, maxTime])

  //y scale
  const y: ScaleLinear<number, number, never> = scaleLinear()
    .domain([
      0,
      // if we have null for example when the array is empty the default value is 10
      max(data, (d: ServicePerformancesType) => {
        return d.responseTime || null
      }) || 10,
    ] as Array<number>)

    .range([height, 0])

  // create the x ticks and create from them the vertical lines of the grid
  const xTicks: JSX.Element = (
    <g transform={`translate(0, ${height})`} opacity="40%" fontSize={10} textAnchor="middle">
      {x.ticks().map((d: Date) => (
        <g opacity="1" className="tick" transform={`translate(${x(d)}, 0)`} key={d.getTime()}>
          <line
            y2={0}
            transform={`translate(0, ${-height})`}
            strokeOpacity="0.2"
            stroke="currentColor"
          />
          <line
            y2={height}
            transform={`translate(0, ${-height})`}
            strokeOpacity="0.2"
            stroke="currentColor"
          />
          <text y="15" dy="0.71em">
            {timeFormat('%d / %m')(new Date(d))}
          </text>
          <text y="35">{timeFormat('%H:%M')(new Date(d))}</text>
        </g>
      ))}
    </g>
  )

  // create the y ticks and create from them the horizontal lines of the grid
  const yTicks: JSX.Element = (
    <g opacity="40%" fontSize={10} textAnchor="end">
      {y.ticks().map((d) => (
        <g key={d} opacity="1" className="tick" transform={`translate(0, ${y(d)})`}>
          <line stroke="currentColor" x2={0} strokeOpacity="0.2" />
          <line stroke="currentColor" x2={width} strokeOpacity="0.2" />
          <text x="-15" dy="0.32em">{`${d}ms`}</text>
        </g>
      ))}
    </g>
  )

  //line generator: each point is [x(d.time), y(d.responseTime)] where d is an element in data array
  // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
  const createLine: Line<ServicePerformancesType> = line<ServicePerformancesType>()
    .curve(curveType)
    .defined(function (d) {
      return d.responseTime !== 0
    })
    .x((d: ServicePerformancesType) => {
      return x(new Date(d.time))
    })
    .y((d: ServicePerformancesType) => y(d.responseTime ? d.responseTime : 0))

  const failuresPoints = (
    <g className="points" transform={`translate(${margin.left}, ${margin.top * 3})`}>
      {failures.map((failure) => (
        <circle
          key={x(new Date(failure.time))}
          cx={x(new Date(failure.time))}
          r="3"
          fill={color[failure.status]}
        ></circle>
      ))}
    </g>
  )

  // create the x ticks for the failures chart
  const xTicksFailures: JSX.Element = (
    <g opacity="40%" fontSize={10} textAnchor="middle">
      {x.ticks().map((d: Date) => (
        <g opacity="1" className="tick" transform={`translate(${x(d)}, 0)`} key={d.getTime()}>
          <text y="15" dy="0.71em">
            {timeFormat('%d / %m')(new Date(d))}
          </text>
          <text y="35">{timeFormat('%H:%M')(new Date(d))}</text>
        </g>
      ))}
    </g>
  )

  // header of the chart
  const failuresHeader: JSX.Element = (
    <g className="failures-header" transform={`translate(10, ${margin.top})`}>
      <text>
        <tspan fontFamily="Titillium Web" fontSize="18px" color="#17324D" fontWeight="700">
          {t('lineChartFailuresTitle')}
        </tspan>
      </text>
    </g>
  )

  return (
    <Grid container direction={'column'} rowGap={4}>
      <Grid item>
        <svg
          className="line-chart-container"
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
          role="img"
        >
          {header}
          <g className="scales" transform={`translate(${margin.left}, ${margin.top * 3})`}>
            {xTicks}
            {yTicks}
          </g>
          <path
            className="line"
            stroke="#17324D"
            strokeWidth="1"
            fill="none"
            d={createLine(data) || undefined}
            transform={`translate(${margin.left}, ${margin.top * 3})`}
          />
        </svg>
      </Grid>

      <Grid item>
        <svg
          className="line-chart-container-failures"
          width={width + margin.left + margin.right}
          height={100}
          role="img"
        >
          {failuresHeader}
          <g className="scales" transform={`translate(${margin.left}, ${margin.top * 3})`}>
            {xTicksFailures}
            <g fontFamily="Poppins" opacity={0.4} fontSize={10} textAnchor="end">
              <g opacity="1" className="tick">
                <line stroke="currentColor" x2={0} strokeOpacity="0.2" />
                <line stroke="currentColor" x2={width} strokeOpacity="0.2" />
              </g>
            </g>
          </g>
          {failuresPoints}
        </svg>
      </Grid>
    </Grid>
  )
}
