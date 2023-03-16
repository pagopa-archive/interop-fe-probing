import { Grid } from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  return (
    <Grid
      container
      direction={"column"}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item gridArea="header">
        <Header />
      </Grid>
      <Grid item container direction={"row"} flexGrow={1}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid
          item
          flexGrow={1}
          sx={{ px: 4, py: 2, "backgroundColor": "#F2F2F2" }}
        >
          <Outlet />
        </Grid>
      </Grid>
      <Grid item gridArea="footer" xs={1}>
        <Footer />
      </Grid>
    </Grid>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     minHeight: "100vh",
    //   }}
    // >
    //   <Box gridArea="header">
    //     <Header />
    //   </Box>
    //   <Box flexGrow={1} sx={{ display: "flex" }}>
    //     <Sidebar />
    //     <Box
    //       sx={{ px: 4, py: 2, "backgroundColor": "#F2F2F2", "width": "100%" }}
    //     >
    //       <Outlet />
    //     </Box>
    //   </Box>
    //   <Box gridArea="footer">
    //     <Footer />
    //   </Box>
    // </Box>
  );
};

export default MainLayout;
