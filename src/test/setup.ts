import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

import { server } from '../mocks/server.js'

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add or change during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

afterEach(cleanup)

beforeEach(() => {
  vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        i18n: {
          changeLanguage: vi.fn(),
        },
        t: vi.fn(),
      }
    },
  }))
})
