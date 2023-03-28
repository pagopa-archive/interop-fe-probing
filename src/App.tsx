import { Grid } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/Router";

function App() {
  return (
    <Grid container direction="column" className="App" sx={{ m: 0 }}>
      <RouterProvider router={router} />
    </Grid>
  );
}

export default App;
