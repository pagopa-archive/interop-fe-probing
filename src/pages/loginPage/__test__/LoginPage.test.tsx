import { describe, expect, test, vi } from 'vitest'
import LoginPage from '../LoginPage'
import { renderWithRouterAndQuery } from '../../../mocks/mockWrapper'
import { logRoles, screen, prettyDOM } from '@testing-library/react'
import * as auth from '../../../authetication/auth'
import userEvent from '@testing-library/user-event'
import * as router from 'react-router'

describe('LoginPage', () => {
  test('render component', () => {
    const { container } = renderWithRouterAndQuery(<LoginPage />)
    expect(container).toMatchSnapshot()
  })
})
