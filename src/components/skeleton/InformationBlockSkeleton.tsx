import React from 'react'
import { InformationContainerSkeleton } from '@pagopa/interop-fe-commons'
import range from 'lodash/range'

interface IProps {
  rows: number
}

export const InformationBlockSkeleton: React.FC<IProps> = ({ rows }) => {
  return (
    <>
      {range(rows).map((row) => (
        <InformationContainerSkeleton key={row} />
      ))}
    </>
  )
}
