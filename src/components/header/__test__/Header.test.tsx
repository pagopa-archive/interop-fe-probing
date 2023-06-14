import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, cleanup, act, renderHook } from '@testing-library/react'
import Header from '../Header'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'
import * as router from 'react-router'
import stores from '../../../store/Store'
import { JwtUser } from '@pagopa/mui-italia'
import * as auth from '../../../authetication/auth'

describe('Header', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<Header />)
    expect(container).toMatchSnapshot()
  })

  test('click Accedi button', async () => {
    const navigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    renderWithRouterAndQuery(<Header />)
    const button = screen.getByRole('button', { name: 'Accedi' })
    const user = userEvent.setup()
    await user.click(button)
    expect(navigate).toBeCalled()
  })

  test('click Esci button and simulate success', async () => {
    // mock zustand log status
    const { result } = renderHook(() => stores.useLogStatusStore())
    act(() => {
      const jwtUser: JwtUser = { id: 'asd' }
      result.current.updateLogStatus(jwtUser)
    })

    vi.spyOn(auth, 'logout').mockImplementation(async () => {
      return Promise.resolve()
    })

    const navigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    renderWithRouterAndQuery(<Header />)

    const button = screen.getByRole('button', { name: 'Esci' })
    const user = userEvent.setup()
    await user.click(button)
    expect(navigate).toBeCalled()
  })

  test('click Esci button and simulate error', async () => {
    // mock zustand log status
    const { result } = renderHook(() => stores.useLogStatusStore())
    act(() => {
      const jwtUser: JwtUser = { id: 'asd' }
      result.current.updateLogStatus(jwtUser)
    })

    vi.spyOn(auth, 'logout').mockImplementation(async () => {
      throw new Error('UNKNOWN ERROR')
    })

    const navigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    renderWithRouterAndQuery(<Header />)

    const button = screen.getByRole('button', { name: 'Esci' })
    const user = userEvent.setup()
    try {
      await user.click(button)
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe('UNKNOWN ERROR')
      }
    }
  })
})
