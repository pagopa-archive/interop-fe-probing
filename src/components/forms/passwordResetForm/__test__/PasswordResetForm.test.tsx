import { PasswordResetForm } from '../PasswordResetForm'
import { expect, test, vi } from 'vitest'
import { renderWithRouterAndQuery } from '../../../../mocks/mockWrapper'
import { cleanup, screen, logRoles } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as auth from '../../../../authetication/auth'

describe('PasswordResetForm', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<PasswordResetForm setResetSuccess={vi.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('fill field and click submit simulating success', async () => {
    const spy = vi.spyOn(auth, 'passwordReset')
    spy.mockImplementation(() => Promise.resolve())

    renderWithRouterAndQuery(<PasswordResetForm setResetSuccess={vi.fn()} />)
    const submitButton = screen.getByRole('button')
    const passwordField = document.getElementById('password') as HTMLInputElement
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement
    const user = userEvent.setup()
    await user.type(passwordField, 'Test@password123.')
    await user.type(confirmPasswordField, 'Test@password123.')
    await user.click(submitButton)
    expect(spy).toBeCalled()
  })

  test('fill field and click submit simulating error', async () => {
    vi.spyOn(auth, 'passwordReset').mockImplementation(async () => {
      throw new Error('UNKNOWN ERROR')
    })

    renderWithRouterAndQuery(<PasswordResetForm setResetSuccess={vi.fn()} />)
    const submitButton = screen.getByRole('button')
    const passwordField = document.getElementById('password') as HTMLInputElement
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement
    const user = userEvent.setup()
    await user.type(passwordField, 'Test@password123.')
    await user.type(confirmPasswordField, 'Test@password123.')

    try {
      await user.click(submitButton)
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe('UNKNOWN ERROR')
      }
    }
  })
})
