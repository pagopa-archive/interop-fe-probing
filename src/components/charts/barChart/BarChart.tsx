import { max, scaleLinear, scaleBand, ScaleLinear, ScaleBand } from 'd3'
import { useTranslation } from 'react-i18next'
import { ServicePercentagesType } from '../../../types'

interface IProps {
  data: Array<ServicePercentagesType>
}
// margin convention often used with D3
const margin = { top: 20, right: 30, bottom: 20, left: 30 }
const width = 300
const height = 200

const color = ['#17324D', '#A2ADB8', '#FE6666']

/**
 * Bar chart component
 * @component
 */
export const BarChart: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation(['detailsPage'])

  const xMax: number = max(data, (d: ServicePercentagesType) => d.value) as number

  // x scale
  const x: ScaleLinear<number, number, never> = scaleLinear().domain([0, xMax]).range([0, width])

  // x scale
  const y: ScaleBand<string> = scaleBand()
    .domain(data.map((d) => d.status))
    .rangeRound([0, height - margin.left])
    .paddingInner(0.25)

  // header of the chart
  const header: JSX.Element = (
    <g className="bar-header" transform={`translate(0, ${margin.top})`}>
      <text>
        <tspan fontFamily="Titillium Web" fontSize="18px" color="#17324D" fontWeight="700">
          {t('barChartTitle')}
        </tspan>
      </text>
    </g>
  )

  // bars and bars' titles
  const bars: JSX.Element = (
    <g transform={`translate(0, ${margin.top * 2})`}>
      {data.map((d: ServicePercentagesType, i: number) => (
        <g key={d.status}>
          <rect
            className="bar"
            y={y(d.status) as number}
            width={x(d.value) as number}
            height={y.bandwidth()}
            fill={color[i % 4]}
          ></rect>
          <text
            x={x(d.value) as number}
            y={y(d.status) as number}
            fontFamily="Titillium Web"
            fontSize="24px"
            color="#17324D"
            fontWeight="600"
            transform={`translate(10, ${y.bandwidth() * 0.7})`}
          >
            {d.value + '%'}
          </text>
        </g>
      ))}
    </g>
  )

  return (
    <svg
      className="bar-chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
    >
      {header}
      {bars}
    </svg>
  )
}
