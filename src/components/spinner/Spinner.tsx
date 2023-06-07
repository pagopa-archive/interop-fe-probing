import { CircularProgress, DialogContent, DialogContentText, Dialog, Stack } from '@mui/material'

interface SpinnerProps {
  open: boolean
  setSpinner: Function
  message: string
}

export const Spinner: React.FC<SpinnerProps> = ({ open, setSpinner, message }) => {
  return (
    <Dialog open={open} onClose={() => setSpinner(false)}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
      <DialogContent>
        <DialogContentText color="primary" sx={{ fontWeight: 'bold', fontSize: 14 }}>
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
