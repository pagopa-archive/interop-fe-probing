import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosInstance } from './axiosInstanceCreator'
import { getServicesType } from './apiRequestTypes'

class Http {
  private instance: AxiosInstance | null = null

  private get http(): AxiosInstance {
    return this.instance != null
      ? this.instance
      : createAxiosInstance(import.meta.env.VITE_API_ENDPOINT)
  }

  getServices<T = any, R = AxiosResponse<T>>(payload: getServicesType): Promise<R> {
    return this.http.get<T, R>('/eservices/searchEservices', {
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
    return this.http.get<T, R>('/eservices/getProducers', {
      params: {
        producerName: payload,
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
