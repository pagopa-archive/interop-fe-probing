import { getServicesType } from "./apiRequestTypes";
import { http as interopAxiosClient } from "./interopAxiosClient";

/**
 * Return services based on the filters and the pagination input
 * @param {getServicesType} data
 */
const getServicesApi = async (payload: getServicesType) => {
  return await interopAxiosClient
    .getServices(payload)
    .then((result: any) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};
/**
 * Return the producers based on a like search on the input
 * @param {string} data
 */
const getProducers = async (payload: string) => {
  return await interopAxiosClient
    .getProducers(payload)
    .then((result: any) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const apiRequests = {
  getServicesApi,
  getProducers,
};

export default apiRequests;
