import {
  HeaderAccount,
  HeaderProduct,
  ProductSwitchItem,
  RootLinkType,
} from "@pagopa/mui-italia";
import { Grid } from "@mui/material";

const link: RootLinkType = {
  title: "PagoPA S.p.A.",
  label: "PagoPA S.p.A.",
  href: "http://localhost:5173/",
  ariaLabel: "",
};

const productsList: ProductSwitchItem[] = [
  {
    id: "pdnd",
    title: "PDND Interoperabilità",
    productUrl: "",
    linkType: "internal",
  },
];

const Header = () => {
  const handleAssistanceClick = () => {
    console.log("Assistance clicked");
  };

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <HeaderAccount
          loggedUser={false}
          rootLink={link}
          onAssistanceClick={handleAssistanceClick}
        />
      </Grid>
      <Grid item>
        <HeaderProduct productsList={productsList} />
      </Grid>
    </Grid>
  );
};
export default Header;
