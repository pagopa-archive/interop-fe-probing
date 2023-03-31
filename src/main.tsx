import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { theme } from '@pagopa/interop-fe-commons'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Backdrop, CircularProgress } from '@mui/material'
import './i18n'

const queryClient = new QueryClient()

const FirstLoadingSpinner: React.FC = () => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        dataid-test="spinner"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<FirstLoadingSpinner />}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>
)
