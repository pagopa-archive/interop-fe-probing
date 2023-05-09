import { Chip, Grid, Typography, Button } from '@mui/material'
import { InformationContainer } from '@pagopa/interop-fe-commons'
import LaunchIcon from '@mui/icons-material/Launch'
import LockIcon from '@mui/icons-material/Lock'
import RefreshIcon from '@mui/icons-material/Refresh'

interface IService {
  eService: string
  regulator: string
  version: string
  statusMonitoring: string
  statusService: string
  statusLastDetection: string
}

interface IProps {
  data: IService
  reloadInfoBlock?: () => void
  viewInCatalogue?: () => void
}

enum Labels {
  eService = 'SCHEDA E-SERVICE',
  regulator = 'EROGATORE',
  version = 'VERSIONE',
  statusMonitoring = 'STATO DEL MONITORAGGIO',
  statusService = "STATO DEL'E SERVICE",
  statusLastDetection = 'STATO ULTIMA RILEVAZIONE',
}

const blocksInfo: Array<{ title: string; blocks: Array<string> }> = [
  {
    title: 'Informazioni generali',
    blocks: ['regulator', 'version', 'eService'],
  },
  {
    title: 'In tempo reale',
    blocks: ['statusMonitoring', 'statusService', 'statusLastDetection'],
  },
]

export const InformationBlock: React.FC<IProps> = ({ data, reloadInfoBlock, viewInCatalogue }) => {
  return (
    <>
      <Grid container direction={'column'} alignItems="center" rowGap={5} mb={5}>
        {blocksInfo.map((blockInfo) => (
          <Grid item container direction="column" key={blockInfo.title}>
            {blockInfo.title === 'In tempo reale' && (
              <>
                <Grid item textAlign={'center'}>
                  <Typography
                    sx={{
                      fontSize: '1.4em',
                      fontWeight: 'bold',
                      color: '#17324D',
                    }}
                  >
                    {blockInfo.title}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  xs={6}
                  px={2}
                  my={2}
                  justifyContent={'end'}
                  sx={{ backgroundColor: '#F2F2F2' }}
                >
                  <Button
                    onClick={reloadInfoBlock}
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
                    startIcon={<RefreshIcon />}
                  >
                    Ricarica
                  </Button>
                </Grid>
              </>
            )}
            <Grid item container direction={'column'}>
              {blockInfo.blocks.map((block) => {
                return block === 'eService' ? (
                  <Grid item key={block} mt={2}>
                    <InformationContainer
                      key={block}
                      label={Labels[block as keyof typeof Labels]}
                      content={
                        <Grid container>
                          <Button
                            color={'primary'}
                            disableRipple // remove onClick effect
                            sx={{
                              fontWeight: 'bold',
                              border: 'none!important',
                              textTransform: 'none',
                              p: '0',
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                              '& .MuiButton-startIcon': {
                                paddingBottom: '1%',
                              },
                            }}
                            variant="outlined"
                            startIcon={<LockIcon />}
                            endIcon={<LaunchIcon />}
                            onClick={viewInCatalogue}
                          >
                            Visualizza sul catalogo
                          </Button>
                        </Grid>
                      }
                    />
                  </Grid>
                ) : (
                  <Grid item key={block}>
                    <InformationContainer
                      key={block}
                      label={Labels[block as keyof typeof Labels]}
                      content={
                        ['statusMonitoring', 'statusService'].includes(block) ? (
                          <Chip
                            size={'small'}
                            sx={{ width: '30%' }}
                            label={data[block as keyof IService]}
                            color={
                              ['attivo', 'online'].includes(data[block as keyof IService])
                                ? 'success'
                                : 'error'
                            }
                          />
                        ) : (
                          data[block as keyof IService]
                        )
                      }
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
