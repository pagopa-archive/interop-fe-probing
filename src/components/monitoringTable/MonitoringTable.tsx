import {
  Table,
  TableRow,
  Filters,
  useFilters,
  Pagination,
  usePagination,
} from '@pagopa/interop-fe-commons'
import { Chip } from '@mui/material'
import { ButtonNaked } from '@pagopa/mui-italia'
import { map, size, parseInt } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import apiRequests from '../../api/apiRequests'
import { getServicesType, GetServicesResponseType } from '../../api/apiRequestTypes'
import { useEffect, useState } from 'react'
import stores from '../../store/Store'
import { format } from 'date-fns'

type EServiceListQueryFilters = {
  eserviceName?: string
  versionNumber?: string
  producerName?: string
  state?: string
}

export const MonitoringTable: React.FC = () => {
  const [producerOptions, setProducerOptions] = useState([])

  const headLabels = [
    'Nome e-service',
    'Versione',
    'Erogatore',
    'Stato e-service',
    'Data ultima rilevazione',
    '',
  ]

  const { filtersParams, ...handlers } = useFilters<EServiceListQueryFilters>([
    {
      name: 'eserviceName',
      type: 'freetext',
      label: 'Cerca per nome e-service',
    },
    {
      name: 'producerName',
      type: 'autocomplete-single',
      label: 'Cerca per erogatore e-service',
      onTextInputChange: fetchProducers,
      options: producerOptions,
    },
    {
      name: 'versionNumber',
      type: 'numeric',
      label: 'Cerca per versione e-service',
    },
    {
      name: 'state',
      type: 'autocomplete-multiple',
      label: 'Cerca stato e-service',
      options: [
        { value: 'ONLINE', label: 'online' },
        { value: 'OFFLINE', label: 'offline' },
        { value: 'N_D', label: 'n/d' },
      ],
    },
  ])

  const { paginationParams, paginationProps, getTotalPageCount } = usePagination({
    limit: import.meta.env.VITE_PAGINATION_LIMIT
      ? parseInt(import.meta.env.VITE_PAGINATION_LIMIT)
      : 10,
  })

  const [activatedSpinner, updateSpinner] = stores.useSpinnerStore((state) => [
    state.activated,
    state.updateSpinner,
  ])

  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])

  async function fetchProducers(value: string) {
    if (size(value) >= 3) {
      updateSpinner(true)
      apiRequests
        .getProducers(value)
        .then((res) => {
          setProducerOptions(res)
        })
        .catch((err) => {
          updateSnackbar(true, 'Errore nella richiesta', 'error')
        })
        .finally(() => {
          updateSpinner(false)
        })
    } else {
      if (producerOptions) {
        setProducerOptions([])
      }
    }
  }

  async function fetchServices(
    paginationParams: any,
    filtersParams: any
  ): Promise<GetServicesResponseType> {
    updateSpinner(true)
    let payload = {
      offset: paginationParams.offset,
      limit: paginationParams.limit,
      producerName: filtersParams.producerName,
      versionNumber: filtersParams.versionNumber,
      eserviceName: filtersParams.eserviceName,
      state: filtersParams.state,
    }
    let response = apiRequests.getServicesApi(payload as getServicesType)
    return response
  }

  const { status, data, isFetching } = useQuery({
    queryKey: ['services', paginationParams, filtersParams],
    queryFn: () => fetchServices(paginationParams, filtersParams),
    keepPreviousData: true,
    staleTime: import.meta.env.VITE_REACT_QUERY_STALE_TIME
      ? parseInt(import.meta.env.VITE_REACT_QUERY_STALE_TIME)
      : 300000,
  })

  useEffect(() => {
    if (activatedSpinner && status !== 'loading') {
      updateSpinner(false)
      if (status === 'error') {
        updateSnackbar(true, 'Errore nella richiesta', status)
      }
    }
  }, [status, isFetching])

  return (
    <>
      <Filters {...handlers} />
      <Table
        isEmpty={data?.content ? data.content.length === 0 : true}
        headLabels={headLabels}
        noDataLabel="La ricerca non ha prodotto risultati"
      >
        {map(data?.content, (service) => (
          <TableRow
            key={service.id}
            cellData={[
              service.eserviceName as string,
              service.versionNumber as string,
              service.producerName as string,
              <Chip
                key={service.id}
                label={service.state?.toLowerCase()}
                color={
                  service.state === 'ONLINE'
                    ? 'success'
                    : service.state === 'OFFLINE'
                    ? 'error'
                    : 'warning'
                }
              />,
              service.responseReceived
                ? format(new Date(service.responseReceived), 'dd-MM-yyyy') +
                  ', ore ' +
                  format(new Date(service.responseReceived), 'HH:mm')
                : '',
            ]}
          >
            <ButtonNaked
              size="small"
              color="primary"
              component="a"
              href={'/monitoring/serviceDetails'}
            >
              Approfondisci
            </ButtonNaked>
          </TableRow>
        ))}
      </Table>
      <Pagination
        totalPages={getTotalPageCount(data?.totalElements ? data.totalElements : 0)}
        {...paginationProps}
      />
    </>
  )
}
export default MonitoringTable
