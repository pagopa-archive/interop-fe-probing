import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ProbingDataInformationBlock } from '../ProbingDataInformationBlock'

describe('ProbingDataInformationBlock', () => {
  test('render component', () => {
    const { container } = render(
      <ProbingDataInformationBlock
        probingData={{
          probingEnabled: true,
          state: 'offline',
          responseReceived: '2023-04-27T14:55:25Z',
          eserviceActive: false,
        }}
        reloadProbingDetails={vi.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })

  test('render component with different data', () => {
    const { container } = render(
      <ProbingDataInformationBlock
        probingData={{
          probingEnabled: false,
          state: 'N/D',
          responseReceived: '2023-04-27T14:55:25Z',
          eserviceActive: false,
        }}
        reloadProbingDetails={vi.fn()}
      />
    )
    expect(container).not.toMatchSnapshot()
  })

  test('render component with responseReceived equal to null', () => {
    const { container } = render(
      <ProbingDataInformationBlock
        probingData={{
          probingEnabled: false,
          state: 'N/D',
          responseReceived: null,
          eserviceActive: false,
        }}
        reloadProbingDetails={vi.fn()}
      />
    )
    expect(container).not.toMatchSnapshot()
  })
})
