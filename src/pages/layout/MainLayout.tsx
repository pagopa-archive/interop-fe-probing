import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
