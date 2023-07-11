import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Errorpage from '../ErrorPage'

describe('ErrorPage', () => {
  test('render component', () => {
    const { container } = render(<Errorpage />)
    expect(container).toMatchSnapshot()
  })
})
