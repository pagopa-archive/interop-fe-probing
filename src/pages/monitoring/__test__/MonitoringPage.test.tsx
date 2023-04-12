import { describe, expect, test } from 'vitest'
import MonitoringPage from '../MonitoringPage'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'

describe('MonitoringPage', () => {
  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<MonitoringPage />)
    expect(container).toMatchSnapshot()
  })
})
