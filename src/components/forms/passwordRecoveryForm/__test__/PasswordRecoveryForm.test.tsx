import { PasswordRecoveryForm } from '../PasswordRecoveryForm'
import { expect, test, vi } from 'vitest'
import { renderWithRouterAndQuery } from '../../../../mocks/mockWrapper'
import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as auth from '../../../../authetication/auth'

describe('PasswordRecoveryForm', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = renderWithRouterAndQuery(
      <PasswordRecoveryForm setRecoverySuccess={vi.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('fill field and click submit simulating success', async () => {
    const spy = vi.spyOn(auth, 'passwordRecovery')
    spy.mockImplementation(() => Promise.resolve())

    renderWithRouterAndQuery(<PasswordRecoveryForm setRecoverySuccess={vi.fn()} />)
    const submitButton = screen.getByRole('button')
    const emailField = screen.getByRole('textbox')
    const user = userEvent.setup()
    await user.type(emailField, 'test@test.com')
    await user.click(submitButton)
    expect(spy).toBeCalled()
  })

  test('fill field and click submit simulating error', async () => {
    vi.spyOn(auth, 'passwordRecovery').mockImplementation(async () => {
      throw new Error('UNKNOWN ERROR')
    })

    renderWithRouterAndQuery(<PasswordRecoveryForm setRecoverySuccess={vi.fn()} />)
    const submitButton = screen.getByRole('button')
    const emailField = screen.getByRole('textbox')
    const user = userEvent.setup()
    await user.type(emailField, 'test@test.com')

    try {
      await user.click(submitButton)
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe('UNKNOWN ERROR')
      }
    }
  })
})
