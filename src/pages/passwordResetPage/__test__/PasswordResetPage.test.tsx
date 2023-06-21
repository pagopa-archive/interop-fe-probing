import { describe, expect, test, vi } from 'vitest'
import { PasswordResetPage } from '../PasswordResetPage'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'
import { logRoles, screen, prettyDOM } from '@testing-library/react'
import * as auth from '../../../authetication/auth'
import userEvent from '@testing-library/user-event'
import * as router from 'react-router'

describe('PasswordResetPage', () => {
  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<PasswordResetPage />)
    expect(container).toMatchSnapshot()
  })

  test('fill field and click submit simulating success', async () => {
    const spyAuth = vi.spyOn(auth, 'passwordReset')
    spyAuth.mockImplementation(() => Promise.resolve())

    const { container } = renderWithRouterAndQuery(<PasswordResetPage />)
    const submitButton = screen.getByRole('button')
    const passwordField = document.getElementById('password') as HTMLInputElement
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement
    const user = userEvent.setup()
    await user.type(passwordField, 'Test@password123.')
    await user.type(confirmPasswordField, 'Test@password123.')
    await user.click(submitButton)
    expect(spyAuth).toBeCalled()
    expect(container).not.toMatchSnapshot()
    expect(screen.getByText(/successScreenTitle/i))
    expect(screen.getByText(/successScreenSubtitle/i))
  })
})
