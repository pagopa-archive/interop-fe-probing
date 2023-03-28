import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/Router";
import { Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import stores, { SpinnerType, SnackbarType } from "./store/Store";

function App() {
  const updateSnackbar = stores.useSnackbarStore(
    (state: SnackbarType) => state.updateSnackbar
  );

  return (
    <div className="App">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={stores.useSpinnerStore((state: SpinnerType) => state.activated)}
        dataid-test="spinner"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RouterProvider router={router} />
      <Snackbar
        open={stores.useSnackbarStore((state: SnackbarType) => state.activated)}
        onClose={() => updateSnackbar(false, "", "error")}
      >
        <Alert
          onClose={() => updateSnackbar(false, "", "error")}
          severity={stores.useSnackbarStore(
            (state: SnackbarType) => state.severity
          )}
          sx={{
            width: "100%",
          }}
          variant="outlined"
        >
          {stores.useSnackbarStore((state: SnackbarType) => state.message)}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
