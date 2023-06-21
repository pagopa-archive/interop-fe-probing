import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosInstance } from './axiosInstanceCreator'
import {
  GetServicesType,
  GetServicesTelemetry,
  GetServicesFilteredTelemetry,
} from './apiRequestTypes'

class Http {
  private instance: AxiosInstance | null = null

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : createAxiosInstance()
  }

  getServices<T = any, R = AxiosResponse<T>>(payload: GetServicesType): Promise<R> {
    return this.http.get<T, R>('/eservices', {
      params: {
        offset: payload.offset,
        limit: payload.limit,
        producerName: payload.producerName,
        versionNumber: payload.versionNumber,
        eserviceName: payload.eserviceName,
        state: payload.state,
      },
      paramsSerializer: (params) => parseParams(params),
    })
  }

  getProducers<T = any, R = AxiosResponse<T>>(payload: string): Promise<R> {
    return this.http.get<T, R>('/producers', {
      params: {
        producerName: payload,
        offset: 0,
        limit: 10,
      },
    })
  }

  getServiceMainData<T = any, R = AxiosResponse<T>>(payload: string): Promise<R> {
    return this.http.get<T, R>(`/eservices/mainData/${payload}`)
  }

  getServiceProbingData<T = any, R = AxiosResponse<T>>(payload: string): Promise<R> {
    return this.http.get<T, R>(`/eservices/probingData/${payload}`)
  }

  getServiceStatisticsData<T = any, R = AxiosResponse<T>>(
    payload: GetServicesTelemetry
  ): Promise<R> {
    return this.http.get<T, R>(`/telemetryData/eservices/${payload.eserviceRecordId}`, {
      params: {
        pollingFrequency: payload.pollingFrequency,
      },
    })
  }

  getServiceFilteredStatisticsData<T = any, R = AxiosResponse<T>>(
    payload: GetServicesFilteredTelemetry
  ): Promise<R> {
    const idToken = sessionStorage.getItem('token')
    return this.http.get<T, R>(`/telemetryData/eservices/filtered/${payload.eserviceRecordId}`, {
      params: {
        pollingFrequency: payload.pollingFrequency,
        startDate: payload.startDate,
        endDate: payload.endDate,
      },
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
  }
}

const parseParams = (params: any) => {
  const keys = Object.keys(params)
  let options = ''

  keys.forEach((key) => {
    if (params[key] !== undefined) {
      const isParamTypeObject = typeof params[key] === 'object'
      const isParamTypeArray = Array.isArray(params[key])

      if (!isParamTypeObject) {
        options += `${key}=${params[key]}&`
      }

      if (isParamTypeObject && isParamTypeArray) {
        params[key].forEach((element: any) => {
          options += `${key}=${element}&`
        })
      }
    }
  })

  return options ? options.slice(0, -1) : options
}

export const http = new Http()
