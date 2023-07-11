import { Table, TableRow } from '@pagopa/interop-fe-commons'
import { Skeleton } from '@mui/material'
import { ButtonSkeleton } from './ButtonSkeleton'
import map from 'lodash/map'
import slice from 'lodash/slice'

const TableRowSkeleton: React.FC<SkeletonTableProps> = ({ headLabels }) => {
  return (
    <TableRow
      cellData={map(slice(headLabels, 0, -1), (label) => (
        <Skeleton />
      ))}
    >
      <ButtonSkeleton size="small" width={100} />
    </TableRow>
  )
}

interface SkeletonTableProps {
  headLabels: Array<string>
}

export const TableSkeleton: React.FC<SkeletonTableProps> = ({ headLabels }) => {
  return (
    <Table headLabels={headLabels}>
      <TableRowSkeleton headLabels={headLabels} />
      <TableRowSkeleton headLabels={headLabels} />
      <TableRowSkeleton headLabels={headLabels} />
      <TableRowSkeleton headLabels={headLabels} />
      <TableRowSkeleton headLabels={headLabels} />
    </Table>
  )
}
