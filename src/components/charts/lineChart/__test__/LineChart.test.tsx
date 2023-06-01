import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { LineChart } from '../LineChart'

const data = [
  {
    name: 'es1',
    status: 'OK',
    response_time: 50,
    check_time: '2023-12-01T14:20:15.995Z',
  },
  {
    name: 'es1',
    status: 'OK',
    response_time: 70,
    check_time: '2023-12-03T14:20:15.995Z',
  },
  {
    name: 'es1',
    status: 'OK',
    response_time: 0,
    check_time: '2023-12-04T14:20:15.995Z',
  },
]

describe('LineChart', () => {
  test('render component', () => {
    const { container } = render(<LineChart data={data} />)
    expect(container).toMatchSnapshot()
  })
})
