import { Grid } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import { useTranslation } from 'react-i18next'
import { ServiceMainData } from '../../types'
import { ButtonNaked } from '@pagopa/mui-italia'
import { Link } from 'react-router-dom'
import { generatePath } from 'react-router'

interface IProps {
  mainData: ServiceMainData
}

const blocksInfo: Array<string> = ['producerName', 'versionNumber', 'eserviceName']

export const MainDataInformationBlock: React.FC<IProps> = ({ mainData }) => {
  const { i18n, t } = useTranslation(['detailsPage', 'general'])

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
                    component={Link}
                    target="_blank"
                    to={generatePath(
                      'https://selfcare.interop.pagopa.it/ui/:lang/fruizione/catalogo-e-service/:eserviceId/:versionId',
                      {
                        lang: i18n.languages ? i18n.languages[0] : 'it',
                        eserviceId: mainData.eserviceId,
                        versionId: mainData.versionId,
                      }
                    )}
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
