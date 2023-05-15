import React from 'react'
import { InformationContainerSkeleton } from '@pagopa/interop-fe-commons'
import range from 'lodash/range'
import { v4 as uuid } from 'uuid'

interface IProps {
  rows: number
}

export const InformationBlockSkeleton: React.FC<IProps> = ({ rows }) => {
  return (
    <>
      {range(rows).map((row) => (
        <InformationContainerSkeleton key={uuid()} />
      ))}
    </>
  )
}
