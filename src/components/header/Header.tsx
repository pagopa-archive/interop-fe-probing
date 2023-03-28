import {
  HeaderAccount,
  HeaderProduct,
  ProductSwitchItem,
  RootLinkType,
} from "@pagopa/mui-italia";

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
    <header>
      <HeaderAccount
        enableAssistanceButton={false}
        loggedUser={false}
        rootLink={link}
        onAssistanceClick={() => {
          console.log("Clicked/Tapped on Assistance");
        }}
      />
      <HeaderProduct productsList={productsList} />
    </header>
  );
};
export default Header;
