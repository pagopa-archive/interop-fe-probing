import { describe, expect, test, vi } from 'vitest'
import { PasswordRecoveryPage } from '../PasswordRecoveryPage'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'
import { logRoles, screen, prettyDOM } from '@testing-library/react'
import * as auth from '../../../authetication/auth'
import userEvent from '@testing-library/user-event'
import * as router from 'react-router'

describe('PasswordRecoveryPage', () => {
  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<PasswordRecoveryPage />)
    expect(container).toMatchSnapshot()
  })

  test('fill field and click submit simulating success', async () => {
    const spyAuth = vi.spyOn(auth, 'passwordRecovery')
    spyAuth.mockImplementation(() => Promise.resolve())

    const { container } = renderWithRouterAndQuery(<PasswordRecoveryPage />)
    const submitButton = screen.getByRole('button')
    const emailField = screen.getByRole('textbox')
    const user = userEvent.setup()
    await user.type(emailField, 'test@test.com')
    await user.click(submitButton)
    expect(spyAuth).toBeCalled()
    expect(container).not.toMatchSnapshot()
    expect(screen.getByText(/successScreenTitle/i))
    expect(screen.getByText(/successScreenSubtitle/i))
  })
})
