/**
 * @typedef {Object} getServicesTypegetServicesType
 */
type getServicesType = {
  offset: number | undefined
  limit: number | undefined
  producerName: string | undefined
  versionNumber: string | undefined
  eserviceName: string | undefined
  state: Array<string> | undefined
}
/**
 * @typedef {Object} ServicesResponseType
 */
type ServicesResponseType = {
  eserviceRecordId?: number
  eserviceName?: string
  versionNumber?: string
  producerName?: string
  state?: string
  responseReceived?: string
}
/**
 * @typedef {Object} GetServicesResponseType
 */
type GetServicesResponseType = {
  content?: Array<ServicesResponseType>
  totalElements?: number
}

type ErrorResponse = {
  detail: string
  errors: Array<string>
  status: number
  timestamp: string
  title: string
  traceid: string
}

export type { ErrorResponse, getServicesType, GetServicesResponseType }
