import { AxiosInstance, AxiosResponse } from "axios";
import { createAxiosInstance } from "./axiosInstanceCreator";
import { getServicesType } from "./apiRequestTypes";

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null
      ? this.instance
      : createAxiosInstance(import.meta.env.VITE_API_ENDPOINT);
  }

  getServices<T = any, R = AxiosResponse<T>>(
    payload: getServicesType
  ): Promise<R> {
    return this.http.get<T, R>("/eservices/searchEservices", {
      params: {
        offset: payload.offset,
        limit: payload.limit,
        producerName: payload.producerName,
        versionNumber: payload.versionNumber,
        eserviceName: payload.eserviceName,
        state: payload.state,
      },
    });
  }

  getProducers<T = any, R = AxiosResponse<T>>(payload: string): Promise<R> {
    return this.http.get<T, R>("/eservices/getProducers", {
      params: {
        producerName: payload,
      },
    });
  }
}

export const http = new Http();
