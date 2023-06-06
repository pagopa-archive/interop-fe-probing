import { Grid } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import { useTranslation } from 'react-i18next'
import { ServiceMainData } from '../../types'
import { ButtonNaked } from '@pagopa/mui-italia'

interface IProps {
  mainData: ServiceMainData
  viewInCatalogue?: () => void
}

const blocksInfo: Array<string> = ['producerName', 'versionNumber', 'eserviceName']

export const MainDataInformationBlock: React.FC<IProps> = ({ mainData, viewInCatalogue }) => {
  const { t } = useTranslation(['detailsPage', 'general'])

  return (
    <>
      <Grid item container direction="column" mb={5}>
        {blocksInfo.map((block) => {
          return block === 'eserviceName' ? (
            <Grid item key={block}>
              <InformationContainer
                key={block}
                label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                content={
                  <ButtonNaked
                    color="primary"
                    size="small"
                    startIcon={<LockIcon />}
                    endIcon={<LaunchIcon />}
                    onClick={viewInCatalogue}
                  >
                    {t('viewInCatalog', { ns: 'detailsPage' })}
                  </ButtonNaked>
                }
              />
            </Grid>
          ) : (
            <Grid item key={block}>
              <InformationContainer
                label={t(block, { ns: 'detailsPage' }).toUpperCase()}
                content={mainData[block as keyof ServiceMainData] as string}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
