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
  responseReceived: string
  /**
   * active status of the e-service
   */
  eserviceActive: boolean
}

export interface ServiceValuesType {
  /**
   * status of the service
   */
  status: string
  /**
   * response time for the service
   */
  responseTime: number
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
}
