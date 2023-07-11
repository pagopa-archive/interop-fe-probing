import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MainDataInformationBlock } from '../MainDataInformationBlock'

const mainData = {
  eserviceName: 'Probing test 3',
  producerName: 'Comune di Milano',
  versionNumber: '7',
  pollingFrequency: 5,
  versionId: 'versionId',
  eserviceId: 'eserviceId',
}

describe('MainDataInformationBlock', () => {
  test('render component', () => {
    const { container } = render(<MainDataInformationBlock mainData={mainData} />)
    expect(container).toMatchSnapshot()
  })
})
