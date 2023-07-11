import { LoginForm } from '../LoginForm'
import { expect, test, vi } from 'vitest'
import { renderWithRouterAndQuery } from '../../../../mocks/mockWrapper'
import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as auth from '../../../../authetication/auth'

describe('LoginForm', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<LoginForm />)
    expect(container).toMatchSnapshot()
  })

  test('fill fields and click login simulating success', async () => {
    const spy = vi.spyOn(auth, 'login')
    spy.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return resolve({
          signInUserSession: {
            idToken: { jwtToken: 'test123' },
            refreshToken: { token: 'test123' },
            accessToken: { jwtToken: 'test123' },
          },
        })
      })
    })

    renderWithRouterAndQuery(<LoginForm />)
    const submitButton = screen.getByRole('button')
    const emailField = screen.getByRole('textbox')
    const passwordField = document.getElementById('password') as HTMLInputElement
    const user = userEvent.setup()
    await user.type(emailField, 'test@test.com')
    await user.type(passwordField, 'test')
    await user.click(submitButton)
    expect(spy).toBeCalled()
  })

  test('fill fields and click login simulating error', async () => {
    vi.spyOn(auth, 'login').mockImplementation(async () => {
      throw new Error('UNKNOWN ERROR')
    })

    renderWithRouterAndQuery(<LoginForm />)
    const submitButton = screen.getByRole('button')
    const emailField = screen.getByRole('textbox')
    const passwordField = document.getElementById('password') as HTMLInputElement
    const user = userEvent.setup()
    await user.type(emailField, 'test@test.com')
    await user.type(passwordField, 'test')

    try {
      await user.click(submitButton)
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe('UNKNOWN ERROR')
      }
    }
  })
})
