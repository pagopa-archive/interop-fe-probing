import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, render, cleanup } from '@testing-library/react'
import Header from '../Header'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'
import * as router from 'react-router'

describe('Footer', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<Header />)
    expect(container).toMatchSnapshot()
  })

  test('click Accedi button', async () => {
    const navigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    const { container } = renderWithRouterAndQuery(<Header />)
    const button = screen.getByRole('button', { name: 'Accedi' })
    const user = userEvent.setup()
    await user.click(button)
    expect(navigate).toBeCalled()
  })
})
