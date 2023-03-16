import {
  FooterLinksType,
  FooterPostLogin,
  Languages,
} from "@pagopa/mui-italia";

const lngs: Languages = {
  it: {
    it: "Italiano",
    en: "Inglese",
    fr: "Francese",
  },
  en: {
    it: "Italian",
    en: "English",
    fr: "French",
  },
  fr: {
    it: "Italien",
    en: "Anglais",
    fr: "Français",
  },
};

const postLoginLinks: FooterLinksType[] = [
  {
    label: "Privacy Policy",
    href: "#privacy-policy",
    ariaLabel: "Privacy Policy",
    linkType: "internal",
  },
  {
    label: "Diritto alla protezione dei dati personali",
    href: "#diritto-allaprotezionedipersonalidati",
    ariaLabel: "Vai al link: Diritto alla protezione dei dati personali",
    linkType: "internal",
  },
  {
    label: "Termini e condizioni",
    href: "#terms-conditions",
    ariaLabel: "Vai al link: Termini e condizioni",
    linkType: "internal",
  },
  {
    label: "Accessibilità",
    href: "#accessibility",
    ariaLabel: "Vai al link: Accessibilità",
    linkType: "internal",
  },
];

const pagoPALink = {
  href: "https://www.pagopa.it/",
  ariaLabel: "Link: vai al sito di PagoPA S.p.A.",
};

const Footer = () => {
  return (
    <FooterPostLogin
      languages={lngs}
      onLanguageChanged={() => {}}
      companyLink={pagoPALink}
      links={postLoginLinks}
    />
  );
};
export default Footer;
