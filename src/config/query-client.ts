import { NotFoundError } from '../utils/errors.utils'
import type { QueryClientConfig } from '@tanstack/react-query'

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: import.meta.env.VITE_REACT_QUERY_STALE_TIME
        ? parseInt(import.meta.env.VITE_REACT_QUERY_STALE_TIME)
        : 300000,
      // avoids retries on status 404
      retry(failureCount, error) {
        if (error instanceof NotFoundError) {
          return false
        }
        return failureCount < 2
      },
    },
  },
}
