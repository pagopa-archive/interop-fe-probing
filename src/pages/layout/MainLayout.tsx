import { Grid } from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  return (
    <Grid container direction={"column"}>
      <Grid item gridArea="header">
        <Header />
      </Grid>
      <Grid item mx={15} sx={{ px: 4, py: 2 }}>
        <Outlet />
      </Grid>
      <Grid item gridArea="footer" mx={15}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
