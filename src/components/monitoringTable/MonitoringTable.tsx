import {
  Table,
  TableRow,
  Filters,
  useFilters,
  Pagination,
  usePagination,
  useAutocompleteTextInput,
  FilterOption,
} from '@pagopa/interop-fe-commons'
import { Chip } from '@mui/material'
import { ButtonNaked } from '@pagopa/mui-italia'
import map from 'lodash/map'
import parseInt from 'lodash/parseInt'
import toLower from 'lodash/toLower'
import toString from 'lodash/toString'
import { useQuery } from '@tanstack/react-query'
import apiRequests from '../../api/apiRequests'
import { getServicesType, GetServicesResponseType } from '../../api/apiRequestTypes'
import stores from '../../store/Store'
import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'
import { TableSkeleton } from '../skeleton/TableSkeleton'
import { useNavigate } from 'react-router-dom'
import { resolvePathVariables } from '../../utils/routerUtils'

type EServiceListQueryFilters = {
  eserviceName?: string
  versionNumber?: string
  producerName?: string
  state?: string
}

export const MonitoringTable: React.FC = () => {
  const { t } = useTranslation(['monitorTable', 'general'])
  const [producersAutocompleteTextInput, setProducersAutocompleteTextInput] =
    useAutocompleteTextInput()
  const [updateSnackbar] = stores.useSnackbarStore((state) => [state.updateSnackbar])
  const navigate = useNavigate()

  async function fetchProducers(value: string): Promise<FilterOption[]> {
    if (producersAutocompleteTextInput) {
      let response = apiRequests.getProducers(value)
      return response
    }
    return []
  }

  const { data: producerOptions } = useQuery({
    queryKey: ['producers', producersAutocompleteTextInput],
    queryFn: () => fetchProducers(producersAutocompleteTextInput),
    onError: (error) => updateSnackbar(true, 'Errore nella richiesta', 'error'),
  })

  const headLabels = [
    t('serviceName'),
    t('serviceVersion'),
    t('serviceProducer'),
    t('serviceState'),
    t('lastDetectionDate'),
    '',
  ]

  const { filtersParams, ...handlers } = useFilters<EServiceListQueryFilters>([
    {
      name: 'eserviceName',
      type: 'freetext',
      label: t('serviceNameFilter'),
    },
    {
      name: 'producerName',
      type: 'autocomplete-single',
      label: t('serviceProducerFilter'),
      onTextInputChange: setProducersAutocompleteTextInput,
      options: producerOptions ? producerOptions : [],
    },
    {
      name: 'versionNumber',
      type: 'numeric',
      label: t('serviceVersionFilter'),
    },
    {
      name: 'state',
      type: 'autocomplete-multiple',
      label: t('serviceStateFilter'),
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

  async function fetchServices(
    paginationParams: any,
    filtersParams: any
  ): Promise<GetServicesResponseType> {
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

  const { data: services, isInitialLoading } = useQuery({
    queryKey: ['services', paginationParams, filtersParams],
    queryFn: () => fetchServices(paginationParams, filtersParams),
    onError: (error) => updateSnackbar(true, 'Errore nella richiesta', 'error'),
  })

  const goDetails = (serviceId: string) =>
    navigate(
      resolvePathVariables('/monitoring/serviceDetails/:serviceId', {
        serviceId: serviceId,
      })
    )

  return (
    <>
      <Filters {...handlers} />
      {isInitialLoading ? (
        <TableSkeleton headLabels={headLabels} />
      ) : (
        <Table
          isEmpty={services?.content ? services.content.length === 0 : true}
          headLabels={headLabels}
          noDataLabel={t('noResultsTable')}
        >
          {map(services?.content, (service) => (
            <TableRow
              key={service.id}
              cellData={[
                service.eserviceName as string,
                service.versionNumber as string,
                service.producerName as string,
                <Chip
                  key={service.id}
                  label={toLower(service.state)}
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
                component="button"
                onClick={() => goDetails(toString(service.id))}
              >
                {t('readMore')}
              </ButtonNaked>
            </TableRow>
          ))}
        </Table>
      )}

      <Pagination
        totalPages={getTotalPageCount(services?.totalElements ? services.totalElements : 0)}
        {...paginationProps}
      />
    </>
  )
}
export default MonitoringTable
