export interface ServiceMainData {
  /**
   * name of the service
   */
  eserviceName: string
  /**
   * name of the producer
   */
  producerName: string
  /**
   * version of the service
   */
  versionNumber: string
  /**
   * polling frequency for the service
   */
  pollingFrequency: number
}

export interface ServiceProbingData {
  /**
   * monitoring state
   */
  probingEnabled: boolean
  /**
   * state of the e-service
   */
  state: string
  /**
   * last detection date
   */
  responseReceived: string | null
  /**
   * active status of the e-service
   */
  eserviceActive: boolean
}

export interface ServiceValuesType {
  /**
   * response time for the service
   */
  responseTime: number
  /**
   * check time for the service
   */
  time: string
}

export interface ServiceFailuresType {
  /**
   * status of the service
   */
  status: string
  /**
   * check time for the service
   */
  time: string
}

export interface ServicePercentagesType {
  /**
   * status of the service
   */
  status: string
  /**
   * percentages of the service
   */
  value: number
}

export interface ServiceStatisticsData {
  percentages: Array<ServicePercentagesType>
  values: Array<ServiceValuesType>
  failures: Array<ServiceFailuresType>
}
