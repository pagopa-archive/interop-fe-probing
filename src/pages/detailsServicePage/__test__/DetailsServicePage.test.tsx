import { describe, expect, test, vi } from 'vitest'
import { screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DetailsServicePage } from '../DetailsServicePage'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'

const logSpy = vi.spyOn(console, 'log')

describe('DettaglioServicePage', () => {
  let container: HTMLElement

  beforeEach(async () => {
    container = renderWithRouterAndQuery(<DetailsServicePage />).container
  })

  afterEach(cleanup)

  test('render component', () => {
    expect(container).toMatchSnapshot()
  })

  test('contains titles', async () => {
    await waitFor(() => {
      expect(screen.queryByText(/Probing test 3/i)).toBeInTheDocument()
      expect(screen.queryByText(/subtitle/i)).toBeInTheDocument()
    })
  })

  test('contains charts', async () => {
    await waitFor(() => {
      const charts = screen.queryAllByRole('img')
      expect(charts).toHaveLength(2)
    })
  })

  test('click Visualizza sul catalogo button', async () => {
    const user = userEvent.setup()
    await waitFor(async () => {
      const button = screen.getByRole('button', {
        name: /viewInCatalog/i,
      })
      await user.click(button)
      expect(logSpy).toHaveBeenCalledWith('view in catalogue')
    })
  })
})
