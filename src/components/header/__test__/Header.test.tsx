import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, render, cleanup } from '@testing-library/react'
import Header from '../Header'

describe('Footer', () => {
  afterEach(cleanup)

  test('render component', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })

  test('click Accedi button', async () => {
    const { container } = render(<Header />)
    const button = screen.getByRole('button', { name: 'Accedi' })
    const user = userEvent.setup()
    await user.click(button)
  })
})
