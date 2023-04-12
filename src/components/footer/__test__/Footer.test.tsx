import Footer from '../Footer'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, render, cleanup } from '@testing-library/react'

describe('Footer', () => {
  test('render component', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })

  test('change language', async () => {
    const { container } = render(<Footer />)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'lingua' })
    await user.click(button)
    const menuItem = screen.getAllByRole('menuitem')[0]
    await user.click(menuItem)
  })

  test('click some footer link to test onExit', async () => {
    const { container } = render(<Footer />)
    const user = userEvent.setup()
    const button = screen.getByRole('link', { name: 'Vai al link: Termini e Condizioni' })
    await user.click(button)
  })
})
