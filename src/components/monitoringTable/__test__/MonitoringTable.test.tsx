import { describe, expect, test, vi } from 'vitest'
import { cleanup, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import MonitoringTable from '../MonitoringTable'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'

import _ from 'lodash'
import * as router from 'react-router'
import userEvent from '@testing-library/user-event'

const navigate = vi.fn()

const OLD_ENV = process.env

describe('ErrorPage', () => {
  afterEach(cleanup)

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<MonitoringTable />)
    expect(container).toMatchSnapshot()
  })

  test('click read more button', async () => {
    const { container } = renderWithRouterAndQuery(<MonitoringTable />)
    // wait sceleton to be remove
    await waitForElementToBeRemoved(() => container.getElementsByClassName('MuiSkeleton-root')[0])

    const tableRows = await within(screen.getByRole('table')).getAllByRole('row')
    const button = await within(tableRows[1]).findByRole('link')
    const user = userEvent.setup()
    await user.click(button)
    expect(navigate).toBeCalled()
  })

  test('test with existing VITE_PAGINATION_LIMIT environment variable', async () => {
    process.env.VITE_PAGINATION_LIMIT = '8'
    const { container } = renderWithRouterAndQuery(<MonitoringTable />)
  })
})
