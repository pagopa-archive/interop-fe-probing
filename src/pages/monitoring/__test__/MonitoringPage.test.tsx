import { describe, expect, test } from 'vitest'
import MonitoringPage from '../MonitoringPage'
import { reducer } from '../../../mocks/mockReducer'

describe('MonitoringPage', () => {
  test('render component', () => {
    const { container } = reducer(<MonitoringPage />)
    expect(container).toMatchSnapshot()
  })
})
