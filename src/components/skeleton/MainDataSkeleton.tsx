import { Grid, Skeleton } from '@mui/material'
import { InformationBlockSkeleton } from './InformationBlockSkeleton'

export const MainDataSkeleton: React.FC = () => {
  return (
    <>
      <Grid container item direction="column" my={5} gap={1} alignSelf={'center'} width={'40%'}>
        <Skeleton
          sx={{ alignSelf: 'center' }}
          variant="rectangular"
          width={300}
          height={15}
        ></Skeleton>
        <Skeleton
          sx={{ alignSelf: 'center' }}
          variant="rectangular"
          width={600}
          height={15}
        ></Skeleton>
      </Grid>
      <Grid item alignSelf={'center'} width={'20%'}>
        <InformationBlockSkeleton rows={3} />
      </Grid>
    </>
  )
}
