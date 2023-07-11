import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { LineChart } from '../LineChart'
import { ServicePerformancesType, ServiceFailuresType } from '../../../../types'

const data: Array<ServicePerformancesType> = [
  {
    responseTime: 50,
    time: '2023-12-01T14:20:15.995Z',
  },
  {
    responseTime: 70,
    time: '2023-12-03T14:20:15.995Z',
  },
  {
    responseTime: 0,
    time: '2023-12-04T14:20:15.995Z',
  },
]

const failures: Array<ServiceFailuresType> = [
  {
    status: 'KO',
    time: '2023-05-17T13:30:00Z',
  },
]

describe('LineChart', () => {
  test('render component', () => {
    const { container } = render(<LineChart data={data} failures={failures} />)
    expect(container).toMatchSnapshot()
  })
})
