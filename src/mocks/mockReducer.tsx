import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function reducer(ui: any, { preloadedState, store, ...renderOptions }: any = {}) {
  function Wrapper({ children }: any) {
    return (
      <Router>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Router>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export { reducer }
