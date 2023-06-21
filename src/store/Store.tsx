import { create } from 'zustand'
import { AlertProps } from '@mui/material'
import { JwtUser } from '@pagopa/mui-italia'
type AlertSeverity = AlertProps['severity']

interface SpinnerType {
  activated: boolean
  updateSpinner: (newState: boolean) => void
}

interface SnackbarType {
  activated: boolean
  message: string
  severity: AlertSeverity
  updateSnackbar: (newState: boolean, newMessage: string, newServerity: AlertSeverity) => void
}

interface LogStatusType {
  status: JwtUser | false
  updateLogStatus: (newState: JwtUser | false) => void
}

const useSpinnerStore = create<SpinnerType>((set) => ({
  activated: false,
  updateSpinner: (newState: boolean) => set({ activated: newState }),
}))

const useSnackbarStore = create<SnackbarType>((set) => ({
  activated: false,
  message: '',
  severity: 'error',
  updateSnackbar: (newState: boolean, newMessage: string, newServerity: AlertSeverity) =>
    set({ activated: newState, message: newMessage, severity: newServerity }),
}))

const stores = {
  useSpinnerStore,
  useSnackbarStore,
}

export default stores
