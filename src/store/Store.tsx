import { create } from "zustand";

interface Spinner {
  activated: boolean;
  updateSpinner: (newState: boolean) => void;
}

interface Snackbar {
  activated: boolean;
  message: string;
  severity: string;
  updateSnackbar: (
    newState: boolean,
    newMessage: string,
    newServerity: string
  ) => void;
}

const useSpinnerStore = create<Spinner>((set) => ({
  activated: false,
  updateSpinner: (newState: boolean) => set({ activated: newState }),
}));

const useSnackbarStore = create<Snackbar>((set) => ({
  activated: false,
  message: "",
  severity: "error",
  updateSnackbar: (
    newState: boolean,
    newMessage: string,
    newServerity: string
  ) =>
    set({ activated: newState, message: newMessage, severity: newServerity }),
}));

const stores = {
  useSpinnerStore,
  useSnackbarStore,
};

export default stores;
