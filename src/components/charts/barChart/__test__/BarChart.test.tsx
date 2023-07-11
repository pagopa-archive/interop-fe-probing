import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { BarChart } from '../BarChart'

const data = [
  { status: 'E-service online', value: 90 },
  { status: 'Monitoraggio sospeso', value: 7 },
  { status: 'E-service offline', value: 15 },
]

describe('BarChart', () => {
  test('render component', () => {
    const { container } = render(<BarChart data={data} />)
    expect(container).toMatchSnapshot()
  })
})
