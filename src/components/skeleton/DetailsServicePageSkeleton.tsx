import { Grid, Button, Skeleton } from '@mui/material'
import { t } from 'i18next'
import { ChartSkeleton } from './ChartSkeleton'
import { InformationBlockSkeleton } from './InformationBlockSkeleton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export const DetailsServicePageSkeleton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Grid container direction="column" spacing={1} sx={{ height: '100%' }}>
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
      <Grid container item direction="column" my={5} gap={1} alignSelf={'center'} width={'40%'}>
        <Skeleton
          sx={{ alignSelf: 'center' }}
          variant="rectangular"
          width={300}
          height={15}
        ></Skeleton>
      </Grid>
      <Grid item alignSelf={'center'} width={'20%'}>
        <InformationBlockSkeleton rows={3} />
      </Grid>
      <Grid item sx={{ mt: 2 }} flexGrow={1}>
        <Grid item container justifyContent="center" gap={10}>
          <Grid item>
            <ChartSkeleton width={600} height={415} />
          </Grid>
          <Grid item>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <ChartSkeleton width={360} height={200} />
              </Grid>
              <Grid item>
                <ChartSkeleton width={360} height={200} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          my={10}
          direction={'row'}
          alignItems={'center'}
          justifyItems={'center'}
          justifyContent={'center'}
        >
          <Button
            onClick={() => navigate(-1)}
            color={'primary'}
            disableRipple
            sx={{
              fontWeight: 'bold',
              border: 'none!important',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            {t('goBack', { ns: 'detailsPage' })}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
