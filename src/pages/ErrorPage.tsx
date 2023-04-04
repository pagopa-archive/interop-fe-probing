import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Errorpage = () => {
  const { t } = useTranslation(['errorPage'])
  return (
    <Grid container direction="column" sx={{ height: '100%' }}>
      <Grid item sx={{ textAlign: 'center' }} my={5}>
        <Typography variant="h4"> {t('title')}</Typography>
        <Typography variant="body1">{t('subtitle')}</Typography>
      </Grid>
    </Grid>
  )
}
export default Errorpage
