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
  href: "https://www.pagopa.it/it/",
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
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <HeaderAccount
          enableAssistanceButton={false}
          loggedUser={false}
          rootLink={link}
          onAssistanceClick={() => {
            console.log("Clicked/Tapped on Assistance");
          }}
        />
      </Grid>
      <Grid item>
        <HeaderProduct productsList={productsList} />
      </Grid>
    </Grid>
  );
};
export default Header;
