import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { LineChart } from '../LineChart'
import { ServiceValuesType } from '../../../../types'

const data: Array<ServiceValuesType> = [
  {
    status: 'OK',
    responseTime: 50,
    time: '2023-12-01T14:20:15.995Z',
  },
  {
    status: 'OK',
    responseTime: 70,
    time: '2023-12-03T14:20:15.995Z',
  },
  {
    status: 'OK',
    responseTime: 0,
    time: '2023-12-04T14:20:15.995Z',
  },
]

describe('LineChart', () => {
  test('render component', () => {
    const { container } = render(<LineChart data={data} />)
    expect(container).toMatchSnapshot()
  })
})
