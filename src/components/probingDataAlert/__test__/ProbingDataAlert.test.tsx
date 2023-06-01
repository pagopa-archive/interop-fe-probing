import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { ProbingDataAlert } from '../ProbingDataAlert'

const mainData = {
  eserviceName: 'Probing test 3',
  producerName: 'Comune di Milano',
  versionNumber: '7',
  pollingFrequency: 5,
}

describe('ProbingDataAlert', () => {
  test('render component case 1', () => {
    const { container } = render(
      <ProbingDataAlert probingEnabled={true} state={'OFFLINE'} eserviceActive={false} />
    )
    expect(container).toMatchSnapshot()
  })

  test('render component case 2', () => {
    const { container } = render(
      <ProbingDataAlert probingEnabled={true} state={'OFFLINE'} eserviceActive={true} />
    )
    expect(container).toMatchSnapshot()
  })

  test('render component case 3', () => {
    const { container } = render(
      <ProbingDataAlert probingEnabled={false} state={'N/D'} eserviceActive={false} />
    )
    expect(container).toMatchSnapshot()
  })
})
